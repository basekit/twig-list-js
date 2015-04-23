'use strict';

const twigListJs = require('../lib/twig-list-js.js');
const fs = require('fs');
const assert = require('assert');

describe('twigListJs', function () {
    it('parses a twig javascript tag', function () {
        let template = fs.readFileSync(__dirname + '/template.twig'),
        expected = [
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
        ],
        list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });

    it('return an empty list if there is no javascript tag', function () {
        let template = fs.readFileSync(__dirname + '/no_scripts_template.twig'),
        expected = [],
        list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });
    it('return an empty array if the javascript tag is malformed', function () {
        let template = fs.readFileSync(__dirname + '/bad_scripts_template.twig'),
        expected = [],
        list = twigListJs(template.toString());

        assert.deepEqual(list, expected);
    });
    it('parses more than one javascript tag');
    it('parses javascript tags with several files in same line');
    it('parses javascript tags with several files and filter options');
});
