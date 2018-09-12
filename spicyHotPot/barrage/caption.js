/**
 *  字幕对象
 * @constructor
 */
class Caption {
	constructor(){
		this.color = '';
		this.x = 0;
		this.y = 0;
		this.txt = '';
		this.line = 0;
		this.length = 0;
		this.activity = true;
		this.space = 0;
		this.speed = 0;
    }
}

/**
 * 字幕操作对象
 * @type {{captionData: Array, canvas: string, context: string, canvasW: number, canvasH: number, maxLine: number, playCaption: Array, captionLocation: number, fontSize: number, linHeight: number, minCapSpace: number, maxCapSpace: number, capSpeed: number, end: boolean, isReplay: boolean, isComment: boolean, newComment: string, launchId: number, listCount: number, limitNum: number, init: Function, initData: Function, playCap: Function, pauseCap: Function, createCap: Function, getCap: Function, launchCap: Function, getRandomColor: Function, getComment: Function}}
 */
var comment = {
	//captionData: ['看见蟑螂','我神经比较大','我不怕不怕啦','不怕不怕不怕啦','一个人睡也不怕不怕啦','勇气当棉被','夜晚再黑我就当看不见','太阳一定就快出现','HELLO','看我','你在害怕什么','是我错','没能够啊把自己变得成熟'],
    captionData: ['看见蟑螂','我神经比较大'],
    canvas: '',
    context: '',
    canvasW: 0,
    canvasH: 0,
    playCurrent: 0,
    maxLine: 6,             // 弹幕行数 && 也可根据字体和行高计算
    lineActivity: [],
    expireCapList: [],
    playCaption: [],
    captionLocation: 0,     // 播放弹幕的索引
    fontSize: 18,           // 弹幕字号 
    linHeight: 30,          // 弹幕行高
    minCapSpace: 50,        // 弹幕最小间隙
    maxCapSpace: 150,       // 弹幕最大间隙
    capMinSpeed: 2,       // 弹幕移动速度(最低速度)
    capMaxSpeed: 4,       // 弹幕移动速度(最高速度)
    lineSpeed: [],          // speed库
    end: false,             // 弹幕发送结束
    isReplay: true,         // 是否循环播放弹幕
    isComment: false,       // 弹幕是否存在
    newComment: '',         // 新添加的弹幕内容
    launchId: 0,            // 定时器 id
    listCount: 0,           // 数据列表的偏移量(用于刷新新数据时累加数据)
    limitNum: 50,           // 分页加载的数量
    init: function(){
        this.initSpeed();
        if(!window.requestAnimationFrame){
            window.requestAnimationFrame =(window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||
            function(callback){return window.setTimeout(callback,1000/60);});
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = (window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.clearTimeout);
        }
        this.canvas = document.getElementById('commentCanvas');
        if(this.canvas) {
            this.canvas.width = this.canvasW = this.canvas.clientWidth;
            this.canvas.height = this.canvasH = this.canvas.clientHeight;
            this.context = this.canvas && this.canvas.getContext('2d');
            this.context.font = this.fontSize + 'px/' + this.linHeight + 'px Arial';
            this.context.fontWeight = '900';

            // this.context.shadowColor = "#000";
            this.context.shadowColor = "red";
        }
    },
    // 初始化数据（第一列）
    initData: function(){
        for(var i=0;i<this.maxLine;i++){
            this.lineActivity.push(this.canvasW + Math.floor(Math.random() * 100));
        }
    	var start = Math.floor(Math.random() * this.maxLine);
        for (var index = start;;) {
            this.createCap(index)
        	if(index < this.maxLine-1){
    			index++;
    		}else{
    			index = 0;
    		}
    		if(index == start){
        		break
        	}
        }
    },
    initSpeed: function(){
        for(var i=0;i<this.maxLine;i++){
            comment.lineSpeed[i] = Math.random() * (comment.capMaxSpeed - comment.capMinSpeed) + comment.capMinSpeed;
        }
    },
    // 播放弹幕
    playCap: function(){
        !this.playCaption.length && this.initData();
        !this.launchId && this.launchCap();
    },
    // 停止播放弹幕
    pauseCap: function(){
        window.cancelAnimationFrame(this.launchId);
        this.launchId = null;
    },
    // 创建弹幕数据
    createCap: function(line){
    	var title = '',
    		that = this;
    	if(this.newComment){
    		title = this.newComment
    	}else{
            if(!this.captionData.length){
                return false;
            }
    		title = this.captionData[0];
    		this.captionData.splice(0, 1);
    	}


        var randomLine = Math.floor(Math.random() * this.maxLine);
        if(this.lineActivity[randomLine] <= this.canvasW + this.fontSize){
            line = randomLine;
        }

        if(title) {
            var $cap = new Caption();
            $cap.space = Math.ceil(Math.random() * (this.maxCapSpace - this.minCapSpace) + this.minCapSpace);
            $cap.x = this.lineActivity[line]
            $cap.y = this.canvasH / this.maxLine * (line + 1) - this.fontSize;
            $cap.color = this.newComment ? '#ffffff' : this.getRandomColor();
            $cap.txt = title;
            $cap.line = line;
            $cap.length = $cap.txt.length * this.fontSize;
            $cap.speed = this.capSpeed + line * 0.3;
            this.lineActivity[line] += ($cap.space + $cap.length)
            this.playCaption.push($cap);
            this.newComment && (this.newComment = '');
            return true;
        }else{
            return false;
        }
    },
    // 添加新弹幕数据
    addCaption: function(content){
        if(content) {
            this.newComment = content;
            !this.isComment && this.playCap();
        }
    },
    // 运行弹幕
    launchCap: function () {
        var me = comment;
        if(me.playCaption.length) {
            me.launchId = window.requestAnimationFrame(me.launchCap);thub
            me.context.clearRect(0, 0, me.canvasW, me.canvasH);
            for (var index in me.playCaption) {
                var $cap = me.playCaption[index],
                curX = $cap.x + $cap.length;

                me.context.fillStyle = $cap.color;
                me.context.fillText($cap.txt, $cap.x, $cap.y);

                $cap.x -= comment.lineSpeed[$cap.line];

                if(me.lineActivity[$cap.line] < me.canvasW){
                    me.createCap($cap.line)
                }
                if(curX < 0){
                    if(me.isReplay && $cap.activity){
                        me.captionData.push($cap.txt)
                    }
                    $cap.activity = false;
                }
                if(curX + $cap.space < 0){
                    me.playCaption.splice(index, 1);
                }
            }
            for(var index in me.lineActivity){
                if(me.lineActivity[index] > me.canvasW){
                    me.lineActivity[index] -= comment.lineSpeed[index];
                }
            }
        }
    },
    // 弹幕颜色(随机颜色)
    getRandomColor: function (){
        return '#'+(function(h){
               return new Array(7-h.length).join("0")+h
           })((Math.random()*0x1000000<<0).toString(16));
    },
    // 获取评论列表
    getComment: function(callback){
        var me = this;
        /**
         * 获取扭蛋机评论列表
         */
        if(!this.end) {
            dataServices.commentsList($stateParams.machine_id, me.listCount, me.limitNum).then(function (data) {
                if (data && data.length > 0) {
                    if (data.length < me.limitNum) {
                        me.end = true;
                    }
                    me.listCount += data.length;
                    me.captionData = new Array().concat(me.captionData, data);
                    if(callback){
                        typeof callback == 'function' && callback();
                    }
                }else{
                    me.end = true;
                }
            }, function (error) {
                console.log(error);
            });
        }
    }
};

comment.init();
document.querySelector('.sendBtn').onclick = function(){
    var input = document.querySelector('.comment-input');
    comment.addCaption(input.value);
    input.value = '';
};
document.querySelector('.comment-input').onkeydown = function(e){
    if(e.keyCode == 13){
        var input = document.querySelector('.comment-input');
        comment.addCaption(input.value);
        input.value = '';
    }
};
document.querySelector('.commment-play-btn').onclick = function(){
    var state = this.className;
    if(state.indexOf('active') < 0){
        this.className += ' active';
        comment.playCap();
    }else{
        this.className = this.className.replace(' active', '');
        comment.pauseCap();
    }
}











