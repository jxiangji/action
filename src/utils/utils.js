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

function isStr(v) {
    return Object.prototype.toString.call(v) === "[object String]";
}

function isNum(v) {
    return Object.prototype.toString.call(v) === "[object Number]";
}

function isRealNum(v) {
    return Object.prototype.toString.call(v) === "[object Number]" && !isNaN(v);
}

function isBoolean(v) {
    return Object.prototype.toString.call(v) === "[object Boolean]";
}

function isUndef(v) {
    return v === undefined;
}

function isNull(v) {
    return v === null;
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
function getUrlSearchObj(url) {
    var res = {},
        s = url ? url.replace(/.+\?/g, "") : window.location.search.replace("?", "");
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

/**
 * 遍历数组或对象
 * @param {*} obj 
 * @param {*} cb 
 */
function each(obj, cb) {
    if (arguments.length !== 2 || typeof cb !== "function") return;
    var context;

    if (isPlainObj(obj)) {
        for (var x in obj) {
            if (obj.hasOwnProperty(x)) {
                context = obj[x];
                if (cb.apply(context, [x, obj[x]]) === false) {
                    break;
                };
            }
        }
    } else if (isArr(obj)) {
        var i = 0,
            len = obj.length;
        for (; i < len; i++) {
            context = obj[i];
            if (cb.apply(context, [context, i]) === false) {
                break;
            };
        }
    }
}

/**
 * 拷贝
 * @param {*} obj 
 */
function cope(obj) {
    return JSON.parse(JSON.stringify(obj));
}


// 递归树
function parseTree(obj, parentKey, res) {
    res = res || [];
    obj.forEach(function(item) {
        var o = {
            key: item.key,
            value: item.value
        };
        parentKey !== undefined && (o.parentKey = parentKey);
        res.push(0)
        item.children && parseTree(item.children, item.key, res);
    })
    return res;
}

/**
 * 函数节流
 * @param fn 回调函数
 * @param wait 时间间隔
 * @param opts  opts.lastRun:wait时间间隔内重复点击,是否要在执行结束后再执行一次fn
 * @returns {Function}
 */
function throttle(fn, wait, opts) {
    var previous = 0,
        timer = null;
    opts = opts || {};

    return function() {
        var context = this,
            args = arguments,
            now = +new Date();
        //执行 条件为初次或符合间隔时间
        if (!previous || now >= previous + wait) {
            previous = now;
            fn.apply(context, args)
        }
        // wait时间间隔内重复点击 是否要在执行结束后再执行一次fn
        else if (opts.lastRun) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                previous = now;
                fn.apply(context, args);
            }, wait);
        }
    }
}

// 观察者(订阅发布)模式
function Observer() {
    this.fns = [];
}
Observer.prototype = {
    subscribe: function(fn) {
        this.fns.push(fn)
    },
    update: function(data, context) {
        context = context || window;
        this.fns.forEach(function(func) {
            func.call(context, data)
        })
    },
    unsubscribe: function(fn) {
        this.fns = this.fns.filter(function(func) {
            if (func === fn) return false;
            return true;
        })
    }
}
