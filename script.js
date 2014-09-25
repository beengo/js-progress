
var progress = {
    option:{
        showText:true,    //是否显示进度的数字百分比形式
        cancelButtonText:undefined,
        pauseButtonText:undefined
    },
    element:{
            progress:document.createElement("div"),         //进度条
            cancelButton:document.createElement("button"),   //取消按钮
            pauseButton:document.createElement("button"),  //暂停按钮
            backBox:document.createElement("div"),
            frontBox:document.createElement("div"),
            progressBar:document.createElement("div"),
            numText:document.createTextNode("0"),
            btnDiv:document.createElement("div")
        },
    create: function() {
            //读取参数 
            this.option.showText = arguments[0] ? arguments[0].showText : true;
            this.option.cancelButtonText = arguments[0] ?arguments[0].cancelButtonText :'cancel';
            this.option.pauseButtonText = arguments[0] ?arguments[0].pauseButtonText :'pause';
            //添加各种类
            addClass(this.element.backBox,'pro-back-box');
            addClass(this.element.frontBox,'pro-front-box');
            addClass(this.element.progressBar,'pro-progress-bar');
            addClass(this.element.progress,'pro-progress');
            addClass(this.element.btnDiv,"pro-btn-box");
            //附加到各个节点,要注意节点的嵌套关系
            this.element.btnDiv.appendChild(this.element.pauseButton);
            this.element.btnDiv.appendChild(this.element.cancelButton);
            this.element.progressBar.appendChild(this.element.progress);
            this.element.frontBox.appendChild(this.element.progressBar);
            this.element.frontBox.appendChild(this.element.btnDiv);

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(this.element.backBox);
            body.appendChild(this.element.frontBox);
            this.element.progress.appendChild(this.element.numText);
            this.element.cancelButton.innerHTML = this.option.cancelButtonText;
            this.element.pauseButton.innerHTML = this.option.pauseButtonText;
            var self = this; 
            this.element.cancelButton.onclick = function() {     //查找绑定的函数并执行它
                bindEvent("cancel");   
            };

            this.element.pauseButton.onclick = function() {
                bindEvent("pause");
            }

            
            //绑定事件
            function bindEvent(name) {
                var index = self.handler[0].indexOf(name);
                if(index != -1) {
                    var handler = self.handler[1][index];
                    if(typeof(handler) == 'function') {
                       handler();
                    }
                }
            }
            //给创建的元素添加类
            function addClass(ele,val) {
                ele.className = val;
            }
        return this;
    },

    handler:new Array(Array(),Array()),

    on:function(name,handler) {
        this.handler[0].push(name);
        this.handler[1].push(handler);
    },

    destroy:function() {            //销毁
        var body = document.getElementsByTagName("body")[0];
        this.element.backBox.remove();
        this.element.frontBox.remove();
    },

    setProgress: function(val) {   //设置进度(0~100)
        if(val >=0 && val <= 100) {
            this.element.progress.style.width = val + '%';
            if(this.option.showText) {
                this.element.progress.innerHTML = val.toFixed(1) + '%';
            }
        }
    }
}
