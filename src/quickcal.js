require('sugar');
var util = require('util');
var _ = require('underscore');

var split = function (input) { return input.split(' '); };
var join = function (array) { return array.join(' '); };

var wordsThatCanBeAbbreviated = 
    split('today tomorrow monday tuesday wednesday thursday friday saturday sunday');

var expandAbbreviation = function (match) {
    return wordsThatCanBeAbbreviated.concat(match).find(function (element) {
        return element.indexOf(match) === 0;
    });
};
var expandAbbreviations = function (input) {
    return input.replace(/\w+/, expandAbbreviation);
};

var guessMonth = function (day, reference) {
    var dayWithCurrentMonth = Date.create(reference).set({day: day});
    var dayWithNextMonth = Date.create(dayWithCurrentMonth).advance({month: 1});

    var dates = [dayWithCurrentMonth, dayWithNextMonth];
    var closestFutureDate = dates.find(function(d){return d.isAfter(reference);});

    return closestFutureDate.format('{Mon}');
};
var containsMonth = function (input) {
    return (/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i).test(input);
};
var containsDay = function (input) {
    return (/^\d{1,2}$/).test(split(input)[0]);
};
var addMonthIfNecessary = function (input, reference) {
    if (!containsDay(input) || containsMonth(input)) return input;

    var tokens = split(input);
    var guessedMonth = guessMonth(tokens[0], reference);
    return join(tokens.include(guessedMonth, 1));
};

var noOfTokensThatContainDate = function (tokens) {
    var doesThisNumberOfTokensContainDate = (1).upto(tokens.length).map(function (n) {
        return Date.create(join(tokens.first(n))).isValid();
    });
    return doesThisNumberOfTokensContainDate.lastIndexOf(true) + 1;
};

var noOfTokensForEnd = function (tokens) {
	if (tokens[0] === 'to') {
		return 1 + noOfTokensThatContainDate(tokens.from(1));
	}
    return 0;
};
var noOfTokensForDuration = function (tokens) {
    var duration = (/\d( )?(d|h|min)/).exec(join(tokens.first(2)));
    if (duration) {
        var occurrencesOfSpace = duration[0].match(/ /) ? 1 : 0;
		return 1 + occurrencesOfSpace;
    }
    return 0;
};

var parse = function (input, reference) {
    if (_.isUndefined(reference)) reference = Date.create();

    var tokens = split(input);
    var noOfTokensForStart = noOfTokensThatContainDate(tokens);

	var tokensAfterStart = tokens.from(noOfTokensForStart);
	var noOfTokensBeforeTitle = noOfTokensForStart 
        + noOfTokensForEnd(tokensAfterStart) 
        + noOfTokensForDuration(tokensAfterStart);

    return {
        date: join(tokens.first(noOfTokensBeforeTitle)),
        title: join(tokens.from(noOfTokensBeforeTitle))
    };
};

var disambiguateTimes = function (input) {
    return input.replace(/\b(\d:\d\d)/, '0$1');
};

var format = function (event) {
    return util.format('%s "%s"', event.date, event.title.replace(/"/g, "'"));
};

var translate = function (input) {
    return _.compose(
        format, parse, addMonthIfNecessary, expandAbbreviations, disambiguateTimes
    ).call(this, input);
};

exports = Object.merge(exports, {
    addMonthIfNecessary: addMonthIfNecessary,
    containsMonth: containsMonth,
    containsDay: containsDay,
    guessMonth: guessMonth,

    expandAbbreviations: expandAbbreviations,
    parse: parse,
    format: format,
    disambiguateTimes: disambiguateTimes,

    noOfTokensForDuration: noOfTokensForDuration,

    translate: translate,
});

