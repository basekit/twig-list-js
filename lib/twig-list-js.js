'use strict';

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}

module.exports = function (templateContent) {
    let lines = templateContent.split('\n'),
    start = lines.findIndex(function (line) {
        return /\{%\s*javascripts$/.test(line);
    }),
    end = lines.findIndex(function (line, index) {
        return /^\s*%\}/.test(line) && index > start;
    });

    return noCorrectJavascriptTag() ? [] : lines.slice(start + 1, end).map(withoutExtraChars);

    function noCorrectJavascriptTag() {
        return start === -1 || end === -1;
    }
}

function withoutExtraChars(line) {
    return line.replace(/'/g, '').trim();
}

