webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function f(a, b) {
    return a + ' ' + b;
}

var _ = __webpack_require__(1);

module.exports = _.curry(f);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var f = __webpack_require__(2);
var $ = __webpack_require__(0);

$("#app").text(f('hello')('world'));

/***/ })
],[3]);