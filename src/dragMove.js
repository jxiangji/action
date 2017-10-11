(function(window, document, $, undefined) {

    /**
     * 自定义的jquery dragMove插件
     * @param $ele 被拖动的元素
     * @param opts opts.dragBar拖动条
     */
    var dragMove = function($ele, opts) {
        this.opts = $.extend(true, {
            dragBar: null
        }, opts);
        this.startMove = false;
        this.$ele = $ele;
        this.$doc = $(document);
        this.$dragBar = $(this.opts.dragBar);
        this.init();
    };

    dragMove.prototype.constructor = dragMove;

    dragMove.prototype.init = function() {
        var self = this,
            pos;

        this.$dragBar.mousedown(function(e) {
            pos = self.mousedown(e);
        });

        this.$doc
            .mousemove(function(e) {
                self.startMove && self.mousemove(e, pos);
            })
            .mouseup(function() {
                self.startMove && (self.startMove = false);
            });
    };

    dragMove.prototype.mousedown = function(e) {
        var ele = this.$ele[0];
        this.startMove = true;
        return {
            offParentLeft: e.pageX - ele.offsetLeft,
            offParentTop: e.pageY - ele.offsetTop,
            remainWidth: document.documentElement.clientWidth - ele.offsetWidth,
            remainHeight: document.documentElement.clientHeight - ele.offsetHeight
        };
    };

    dragMove.prototype.mousemove = function(e, pos) {

        var curLeft = e.pageX - pos.offParentLeft,
            curTop = e.pageY - pos.offParentTop;

        this.$ele.css({
            top: (curTop < 0 || pos.remainHeight < 0) ? 0 : curTop > pos.remainHeight ? pos.remainHeight : curTop,
            left: (curLeft < 0 || pos.remainWidth < 0) ? 0 : curLeft > pos.remainWidth ? pos.remainWidth : curLeft
        })
    };

    $.fn.dragMove = function(options) {
        return this.each(function() {
            new dragMove($(this), options)
        })
    };

})(window, document, jQuery);
