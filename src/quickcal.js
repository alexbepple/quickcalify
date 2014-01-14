var _ = require('underscore');

var wordsThatCanBeAbbreviated = 
    'today tomorrow monday tuesday wednesday thursday friday saturday sunday'
    .split(' ');

var expandAbbreviations = function (match) {
    return _.find(wordsThatCanBeAbbreviated.concat(match), function (element) {
        return element.indexOf(match) === 0;
    });
};

var translate = function (input) {
    return input.replace(/\w+/, expandAbbreviations);
};

exports.translate = translate;
