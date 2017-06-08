function isUndef(v) {
    return v === undefined || v === null;
}

function isDef(v) {
    return v === true;
}

function isTrue(v) {
    return v === true;
}

function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
}

function _toString(val) {
    return val = null ?
        '' :
        typeof val === 'object' ?
        JSON.stringify(val, null, 2) :
        String(val)
}