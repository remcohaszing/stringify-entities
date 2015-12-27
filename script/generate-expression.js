/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module stringify-entities:script
 * @fileoverview Generate the named-entity detector
 *   expression.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var fs = require('fs');
var path = require('path');
var entities = require('character-entities-html4');

/*
 * Escape-codes.
 */

var escapes = ['"', '\'', '<', '>', '&', '`'];

/*
 * Generate the expression.
 */

var list = [];
var name;

for (name in entities) {
    if (escapes.indexOf(entities[name]) === -1) {
        list.push(entities[name]);
    }
}

var expression = new RegExp('[' + list.join('') + ']', 'g');

/*
 * Write.
 */

var doc = [
    '/* This script was generated by `script/generate-expression.js` */',
    '',
    '\'use strict\';',
    '',
    '/* eslint-env commonjs */',
    '/* eslint-disable no-irregular-whitespace */',
    '',
    'module.exports = ' + expression + ';'
].join('\n');

fs.writeFileSync(path.join('lib', 'expression.js'), doc + '\n');