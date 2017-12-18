"use strict";

var a = "xiangji";

var temp = "<div>" + a + "</div>";

console.log(temp);

var _ref = [1, 2, 4],
    c = _ref[0],
    b = _ref[2];


function f(x) {
	var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

	return x + y;
}