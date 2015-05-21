'use strict';

const startPattern = /\{% javascripts\s/;
const endPattern = /%\}\s/;
const jsFilePattern = /'([\w\/\.\*-]+?)'\s+?/g;

function getJavascriptChunks (text) {
    let chunks = [];
    let rest = text;
    while (rest && rest.length > 0) {
        let result = getChunk(rest);
        if (result.chunk && result.chunk.length !== 0) {
            chunks.push(result.chunk);
            rest = rest.slice(result.start);
        } else {
            rest = null;
        }
    }
    return chunks;
}

function getChunk (text) {
    const sliceStart = text.search(startPattern);
    const rest = text.slice(sliceStart);
    const sliceEnd =rest.search(endPattern);
    return {
        chunk: rest.slice(0, sliceEnd),
        start: sliceStart + sliceEnd + 1
    };
}

function getList (chunks) {
    let list = [];
    let result;
    chunks.forEach(function (chunk) {
        while (result = jsFilePattern.exec(chunk)) {
            list.push(result[1]);
        }
    });
    return list;
}

module.exports = function (template) {
    return getList(getJavascriptChunks(template));
}

