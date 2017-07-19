/**
 * 工具方法集合
 */

function _toString(val) {
    return val = null ?
        '' :
        typeof val === 'object' ?
        JSON.stringify(val, null, 2) :
        String(val)
}

/**
 * 数据类型判断
 */
function isArr(v) {
    return Object.prototype.toString.call(v) === "[object Array]";
}

function isObj(v) {
    return Object.prototype.toString.call(v) === "[object Object]";
}

function isString(v) {
    return Object.prototype.toString.call(v) === "[object String]";
}

function isNumber(v) {
    return Object.prototype.toString.call(v) === "[object Number]";
}

function isRealNumber(v) {
    return Object.prototype.toString.call(v) === "[object Number]" && !isNaN(v);
}

function isUndef(v) {
    return v === undefined || v === null;
}