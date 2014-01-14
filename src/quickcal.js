
var abbreviations = {
    'tod': 'today',
    'tom': 'tomorrow'
};

var expandAbbreviations = function (match) {
    if (abbreviations.hasOwnProperty(match)) return abbreviations[match];
    return match;
};

var translate = function (input) {
    return input.replace(/\w+/, expandAbbreviations);
};

exports.translate = translate;
