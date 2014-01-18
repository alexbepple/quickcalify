require('sugar');
var util = require('util');

var wordsThatCanBeAbbreviated = 
    'today tomorrow monday tuesday wednesday thursday friday saturday sunday'
    .split(' ');

var expandAbbreviation = function (match) {
    return wordsThatCanBeAbbreviated.concat(match).find(function (element) {
        return element.indexOf(match) === 0;
    });
};
var expandAbbreviations = function (input) {
    return input.replace(/\w+/, expandAbbreviation);
};

var parse = function (input) {
    var tokens = input.split(' ');
    var noOfTokensForValidDates = (1).upto(tokens.length).map(function (n) {
        return Date.create(tokens.first(n).join(' ')).isValid();
    });
    var noOfTokensForStart = noOfTokensForValidDates.lastIndexOf(true) + 1;
    return {
        start: tokens.first(noOfTokensForStart).join(' '),
        title: tokens.from(noOfTokensForStart).join(' ')
    };
};

var format = function (event) {
    return util.format('%s "%s"', event.start, event.title);
};

var translate = function (input) {
    return format(parse(expandAbbreviations(input)));
};

exports = Object.merge(exports, {
    expandAbbreviations: expandAbbreviations,
    parse: parse,
    format: format,
    translate: translate
});
