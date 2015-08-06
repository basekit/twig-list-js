'use strict';

const twigListJs = require('../index.js');
const fs = require('fs');
const assert = require('assert');

describe('twigListJs', function () {
    it('not only accepts templates but file paths to read them as well', function () {
        const expected = [
            'libs/jquery-1.10.2.min.js',
            'libs/jquery-ui.custom.min.js',
            'libs/jquery.cookie.js',
            'libs/moment.js',
            'libs/underscore.js',
            'libs/backbone.js',
            'libs/twig.js',
            'libs/redactor/redactor.js',
            'libs/redactor/fontcolor.js',
            'libs/marionette.js',
            'public/js/mycode.js'
        ];
        const list = twigListJs(__dirname + '/template.twig');

        assert.deepEqual(list, expected);
    });

    it('parses a twig javascript tag', function () {
        const template = fs.readFileSync(__dirname + '/template.twig');
        const expected = [
            'libs/jquery-1.10.2.min.js',
            'libs/jquery-ui.custom.min.js',
            'libs/jquery.cookie.js',
            'libs/moment.js',
            'libs/underscore.js',
            'libs/backbone.js',
            'libs/twig.js',
            'libs/redactor/redactor.js',
            'libs/redactor/fontcolor.js',
            'libs/marionette.js',
            'public/js/mycode.js'
        ];
        const list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });

    it('return an empty list if there is no javascript tag', function () {
        const template = fs.readFileSync(__dirname + '/no_scripts_template.twig');
        const expected = [];
        const list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });

    it('parses more than one javascript tag', function () {
        const template = fs.readFileSync(__dirname + '/two_scripts.twig');
        const expected = [
            'libs/jquery-1.10.2.min.js',
            'libs/jquery-ui.custom.min.js',
            'libs/jquery.cookie.js',
            'libs/moment.js',
            'libs/underscore.js',
            'libs/backbone.js',
            'libs/twig.js',
            'libs/redactor/redactor.js',
            'libs/redactor/fontcolor.js',
            'libs/marionette.js',
            'public/js/mycode.js'
        ];
        const list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });

    it('parses javascript tags with several files in same line', function () {
        const template = fs.readFileSync(__dirname + '/one_line.twig');
        const expected = [
            'libs/jquery-1.10.2.min.js',
            'libs/lightbox-2.6.js',
            'libs/underscore.js',
            'libs/backbone.js',
            'libs/twig.js',
            'libs/redactor/redactor.js',
            'libs/redactor/fontcolor.js',
            'libs/marionette.js',
            'public/js/mycode.js'
        ];
        const list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });

    it('parses javascript tags with several files and filter options', function () {
        const template = fs.readFileSync(__dirname + '/one_line.twig');
        const expected = [
            'libs/jquery-1.10.2.min.js',
            'libs/lightbox-2.6.js',
            'libs/underscore.js',
            'libs/backbone.js',
            'libs/twig.js',
            'libs/redactor/redactor.js',
            'libs/redactor/fontcolor.js',
            'libs/marionette.js',
            'public/js/mycode.js'
        ];
        const list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });

    it('parses javascript includes with * characters', function () {
        const template = fs.readFileSync(__dirname + '/asterisk.twig');
        const expected = [
            'libs/twig.js',
            'libs/redactor/redactor.js',
            'libs/marionette.js',
            'responsive/site/widgets/*/*.js',
            'responsive/editor/widgets/*/*-mobile.js',
            'public/js/mycode.js'
        ];
        const list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });
});
