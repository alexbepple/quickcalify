var _ = require('underscore');

var wordsThatCanBeAbbreviated = [
    'today',
    'tomorrow'
];

var expandAbbreviations = function (match) {
    return _.find(wordsThatCanBeAbbreviated.concat(match), function (element) {
        return element.indexOf(match) === 0;
    });
};

var translate = function (input) {
    return input.replace(/\w+/, expandAbbreviations);
};

exports.translate = translate;
