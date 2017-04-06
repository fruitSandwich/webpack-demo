function f(a, b) {
    return a + ' ' + b;
}

var _ = require('lodash');

module.exports = _.curry(f);
