/*基于canvas❀关系图*/
(function () {

    const utils = {};


    const drawFn = function (opts) {
        if (!(this instanceof drawFn)) {
            return new draw(opts);
        }
        this.opts = Object.assign({}, opts);
        this.ctx = this.opts.ctx;
        this.nodes = [];
        this.links = [];
    };

    drawFn.prototype = {
        constructor: drawFn,

        _init(){
        },

        //画节点点
        node(){
        },

        pic(src, x = 0, y = 0){
            this.ctx.drawImage(src, x, y);
        },

        //画线条
        line(path = []){
            this.ctx.moveTo(...path.shift());
            path.forEach(p => this.ctx.moveTo(...p));
            this.ctx.stroke();
        },
    };


    const drawRelation = function () {

    };

    drawRelation.prototype = {
        constructor: drawRelation,
        init(){
        },
        _createScene(){
            this.canvas = document.querySelector(this.opts.id);
            this.ctx = this.canvas.getContext('2d');
        },
    };


})();