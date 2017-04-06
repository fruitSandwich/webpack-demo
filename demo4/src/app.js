var f = require('./module1');
var $ = require('jquery');


$("#app").text(f('hello')('world'));