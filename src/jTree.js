(function(window, document, $, undefined) {

    var self;

    /**
     * 自定义的jquery 树形插件
     */
     var jTree = function($ele, opts) {
        self=this;
        this.opts = $.extend(true, {
            key:{
                id:"id",
                text:'text',
                children:"children"
            },
            callback:{
            },
            data:[]
        },opts);
        this.$container = $ele;
        this.init();
    };

    var jFn=jTree.prototype; 

    jFn.constructor = jTree;

    jFn.init = function() {
        this.renderTreeObj(this.$container,this.opts.data)
    }

    jFn.renderTreeObj=function($container,data){
        var childrenKeyStr=this.opts.key.children;
        var $ulContainer=$('<ul>').appendTo($container);
        data.forEach(function(datai){
            var $liContainer=$('<li>').appendTo($ulContainer);
            var $aContainer=$(self.treeItemTempStr(datai)).appendTo($liContainer);
            self.bindEvent($aContainer,"click",datai);
            if(datai[childrenKeyStr]){
                self.renderTreeObj($liContainer,datai[childrenKeyStr]);
            }
        })
    }

    jFn.treeItemTempStr=function(datai){
        var idKeyStr=this.opts.key.id,
        textKeyStr=this.opts.key.text;
        return '<a'+this.treeAddId(datai[idKeyStr])+'>'+datai[textKeyStr]+'</a>';
    }

    jFn.treeAddId=function(id){
        return id!=='undefined'?(' id=\'treeNode_'+id+'\''):'';
    }

    jFn.bindEvent=function($dom,event,data){
        if(event==="click"){
            $dom.click(function(){
                if(typeof self.opts.callback.click==='function'){
                    self.opts.callback.click(data,$(this));
                }
            })
        }
    }

    $.fn.jTree = function(options) {
        this.each(function() {
            new jTree($(this), options)
        });

        return this;
    };

})(window, document, jQuery);


var testData=[{
    id:"111",
    text:"111_text_1111",
    children:[{
        id:"111-111",
        text:"djsafkasdf",
    },{
        id:"111-222",
        text:"djsafkasdf",
    }]
}];
var instance=$("div").jTree({
    data:testData
});