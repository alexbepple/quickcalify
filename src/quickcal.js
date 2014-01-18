require('sugar');
var util = require('util');

var wordsThatCanBeAbbreviated = 
    'today tomorrow monday tuesday wednesday thursday friday saturday sunday'
    .split(' ');

var expandAbbreviations = function (match) {
    return wordsThatCanBeAbbreviated.concat(match).find(function (element) {
        return element.indexOf(match) === 0;
    });
};

var translate = function (input) {
    var inputExpanded = input.replace(/\w+/, expandAbbreviations);
    var tokens = inputExpanded.split(' ');

    var noOfTokensForValidDates = (1).upto(tokens.length).map(function (n) {
        return Date.create(tokens.first(n).join(' ')).isValid();
    });
    var noOfTokensForStart = noOfTokensForValidDates.lastIndexOf(true) + 1;
    if (noOfTokensForStart > 0) {
        var start = tokens.first(noOfTokensForStart).join(' ');
        var titleTokens = tokens.from(noOfTokensForStart);
        return util.format('%s "%s"', start, titleTokens.join(' '));
    }
    return inputExpanded;
};

exports.translate = translate;
