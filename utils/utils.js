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

/**
 * 检测正则类型
 * @param {*} str 
 * @param {*} type 
 */
function checkRegType(str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}

/**
 * 获取url search参数组成obj
 * @param {*} url 
 */
function getUrlSearchObj() {
    var res = {},
        s = window.location.search.replace("?", "");
    if (s.length) {
        s.split("&").forEach(function(item) {
            var pos = item.indexOf("="),
                name = item.substring(0, pos),
                val = window.decodeURIComponent(item.substring(pos + 1))
            res[name] = val;
        })
    }
    return res;
}