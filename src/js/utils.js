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
        s.split("&").forEach(item => {
            var pos = item.indexOf("="),
                name = item.substring(0, pos),
                val = window.decodeURIComponent(item.substring(pos + 1));
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
    let context;

    if (Array.isArray(obj)) {
        var i = 0,
            len = obj.length;
        for (; i < len; i++) {
            context = obj[i];
            if (cb.apply(context, [context, i]) === false)
                break;
        }
    } else {
        for (var x in obj) {
            context = obj[x];
            if (cb.apply(context, [x, obj[x]]) === false)
                break;
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

/**
 * 合并对象 遇到相同key时_from覆盖to的值
 * @param  {[type]} to    [description]
 * @param  {[type]} _from [description]
 * @return {[type]}       [description]
 */
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to
}


// 递归树
function parseTree(obj, parentKey, res) {
    res = res || [];
    obj.forEach(function (item) {
        var o = {
            key: item.key,
            value: item.value
        };
        if (parentKey !== undefined)
            o["parent"] = parentKey;
        res.push(o)
        item.children && parseTree(item.children, item.key, res);
    });
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
    var previous, timer;
    opts = opts || {};

    return function () {
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
            timer = setTimeout(function () {
                previous = now;
                fn.apply(context, args);
            }, wait);
        }
    }
}

/**
 * 计算一个字符串中无重复字符出现length最长的子字符串 如"ababcdeba"中"abcde"
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function longestStrOf(str) {
    var i, j,
        c = [],
        r = "",
        a = str.split(""),
        len = a.length;
    for (i = 0; i < len; i++) {
        c[i] = "";
        for (j = i; j < len; j++) {
            if (c[i].indexOf(a[j]) !== -1)
                break;
            else
                c[i] += a[j];
        }
    }
    c.forEach(function (item) {
        if (item.length > r.length)
            r = item;
    });
    return r;
}

//将cookie字符串解析为obj对象
function parseCookieToObj(str) {
    if (!isStr(str)) return str;
    var out = {},
        arr = str.split(";");
    arr.forEach(function (item) {
        var tArr = item.replace("=", "__PLACE__").split("__PLACE__");
        out[tArr[0].trim()] = tArr[1];
    });
    return out;
}


/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}


/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
            (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
                (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
                    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
                        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
                            (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}

/**
 *
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
function offset(ele) {
    var pos = {
        left: 0,
        top: 0
    };
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    ;
    return pos;
}


var keyCodeMap = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause',
    20: 'Caps Lock',
    27: 'Escape',
    32: 'Space',
    33: 'Page Up',
    34: 'Page Down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    42: 'Print Screen',
    45: 'Insert',
    46: 'Delete',

    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',

    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',

    91: 'Windows',
    93: 'Right Click',

    96: 'Numpad 0',
    97: 'Numpad 1',
    98: 'Numpad 2',
    99: 'Numpad 3',
    100: 'Numpad 4',
    101: 'Numpad 5',
    102: 'Numpad 6',
    103: 'Numpad 7',
    104: 'Numpad 8',
    105: 'Numpad 9',
    106: 'Numpad *',
    107: 'Numpad +',
    109: 'Numpad -',
    110: 'Numpad .',
    111: 'Numpad /',

    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',

    144: 'Num Lock',
    145: 'Scroll Lock',
    182: 'My Computer',
    183: 'My Calculator',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
};

/**
 * @desc 根据keycode获得键名
 * @param  {Number} keycode
 * @return {String}
 */
function getKeyName(keycode) {
    if (keyCodeMap[keycode]) {
        return keyCodeMap[keycode];
    } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
    }
};


/**
 * ---listener 自定义事件处理器
 * @constructor
 */
function Listener() {
    this.fns = {};
}

Listener.prototype = {
    on: function (ev, fn) {
        if (!this.fns[ev]) {
            this.fns[ev] = [];
        }
        this.fns[ev].push(fn);
    },
    emit: function (ev, ...args) {
        const _this = this;
        const fns = this.fns[ev] || [];
        fns.forEach(fn => fn.apply(_this, args));
    },
    remove: function (ev, fn) {
        const fns = this.fns[ev];
        if (!fns) return this;
        for (let i = 0; i < fns.length; i++) {
            if (fns[i] === fn) {
                fns.splice(i, 1);
                break;
            }
        }
    },
    destroy: function (ev) {
        if (this.fns[ev]) {
            delete this.fns[ev];
        }
    }
};