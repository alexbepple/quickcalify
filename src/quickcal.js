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

var parse = function (input) {
    var tokens = split(input);
    var noOfTokensForValidDates = (1).upto(tokens.length).map(function (n) {
        return Date.create(join(tokens.first(n))).isValid();
    });
    var noOfTokensForStart = noOfTokensForValidDates.lastIndexOf(true) + 1;
    return {
        start: join(tokens.first(noOfTokensForStart)),
        title: join(tokens.from(noOfTokensForStart))
    };
};

var format = function (event) {
    return util.format('%s "%s"', event.start, event.title);
};

var translate = function (input) {
    return _.compose(
        format, parse, expandAbbreviations
    ).call(this, input);
};

exports = Object.merge(exports, {
    expandAbbreviations: expandAbbreviations,
    parse: parse,
    format: format,
    translate: translate
});

