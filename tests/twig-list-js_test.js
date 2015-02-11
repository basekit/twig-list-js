'use strict';

const twigListJs = require('../lib/twig-list-js.js'),
      fs = require('fs');

exports.testGetList = function (test) {
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

    test.deepEqual(list, expected);
    test.done();
};

exports.testNoScript = function (test) {
    let template = fs.readFileSync(__dirname + '/no_scripts_template.twig'),
        expected = [],
        list = twigListJs(template.toString());

    test.deepEqual(list, expected);
    test.done();
};


exports.testBadScript = function (test) {
    let template = fs.readFileSync(__dirname + '/bad_scripts_template.twig'),
        expected = [],
        list = twigListJs(template.toString());

    test.deepEqual(list, expected);
    test.done();
};
