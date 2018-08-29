(function(win, doc){
    //得到html元素
    var docEl = doc.documentElement,
    //横屏处理，只要用户改变了设备的查看模式，就会触发orientationchange事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        refresh = function () { 
            var w = docEl.clientWidth,
                dpr = win.devicePixelRatio || 1;
                // wq: 这里 *100 是因为在设计师给的标准版本上 的得到一个 1rem== （??）PX的这么一个换算标准
                // 因为可能这里的 w == 375 这么算1rem == 1px  而最小也只能是12px,综合考虑 *100比较合理
            docEl.style.fontSize = 100 * (w/375) + 'px';

            function setBodyFontSize () {
                if (doc.body) {
                    // body的默认字体大小 ，对rem无影响
                    doc.body.style.fontSize = '14px';
                }else {
                    //这里的DOMContentLoaded是等待dom元素都加载上了（jQ的 $(document).ready(））模仿于此，
                    //不同于onload（是所有资源都加载了）
                    doc.addEventListener('DOMContentLoaded', refresh)
                }
            }
            setBodyFontSize();  
        };
    refresh();

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refresh, false);
})(window, document);

/**
 *  rem是相对于文档根元素html的字体大小设置的单位！ 只需要html的font-szie设置一个px值！
 *  1rem就等于这个 px值， As => html{font-size:16px},那么1rem=16px
 *  
 */