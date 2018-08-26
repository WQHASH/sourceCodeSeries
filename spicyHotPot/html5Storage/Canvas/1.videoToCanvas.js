/*
 * video视频转成canvas（兼容至IE8+）
 * Author: Zijor   Created On: 2017-06-25
 * 
 *  使用方法：
 *      var videoCanvas = new VideoToCanvas(videoDom);
 *
 *  对象的属性：
 *      暂无。
 *
 *  对象的方法：
 *      play       播放视频
 *      pause      暂停视频
 *      playPause  播放或暂停视频
 *      
 *      
 *      wq: 关于requestAnimationFramed的理解： https://www.cnblogs.com/xiaohuochai/p/5777186.html
 *          requestAnimationFramed 有点类似于setTimeout只是没有时间间隔参数
 *              
 */

var VideoToCanvas = (function(window, document) {
    function VideoToCanvas(videoElement) {
        if (!videoElement) { return; }

        var canvas = document.createElement('canvas');
        canvas.width = videoElement.offsetWidth;
        canvas.height = videoElement.offsetHeight;
        ctx = canvas.getContext('2d');

        var newVideo = videoElement.cloneNode(false);

        var timer = null;

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

        function drawCanvas() {
            ctx.drawImage(newVideo, 0, 0, canvas.width, canvas.height);
            timer = requestAnimationFrame(drawCanvas);
        }

        function stopDrawing() {
            cancelAnimationFrame(timer);
        }

        newVideo.addEventListener('play', function() {
            drawCanvas();
        }, false);
        newVideo.addEventListener('pause', stopDrawing, false);
        newVideo.addEventListener('ended', stopDrawing, false);

        videoElement.parentNode.replaceChild(canvas, video);
        this.play = function() {
            newVideo.play();
        };

        this.pause = function() {
            newVideo.pause();
        };

        this.playPause = function() {
            if (newVideo.paused) {
                this.play();
            } else {
                this.pause();
            }
        };

        this.drawFrame = drawCanvas;
    }

    return VideoToCanvas;

})(window, document);