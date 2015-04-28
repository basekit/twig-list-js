# twig-list-js
Output an array of all javascript files included within javascript twig tag in a twig template.
We use it to avoid manually maintaining a list of js files to be included in the test run. Depending on some command line
switches, the runner decides which twig templates to use in the tests and get the list of js files to include from it.

## Quick guide
To install: npm install twig-list-js. 
You probably want to use --save-dev flag for usage only in your test suite.

Usage:
---
    const twigParser = require('twig-list-js');

    const myArray = twigParser(template);
---
