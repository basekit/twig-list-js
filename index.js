#!/usr/bin/env node

'use strict';

const template = process.argv[2],
      twigList = require(__dirname + '/lib/twig-list-js.js'),
      fs = require('fs');

process.stdout.write(JSON.stringify(twigList(fs.readFileSync(template).toString())));
