/**首先将需要操作的元素保存为变量
* 建议大家在做任何DOM操作的时候都先保存为一个变量
* 防止频繁的寻找DOM节点，降低了页面性能，虽然现在设备好了，
* 但是优化还是有必要的，点点优化带来的是更加良好的用户体验
**/
var loadBtn = $('#loadBtn');//刷新键
var play = $('#playPausebtn');//播放暂停键
var mutedBtn = $('#mutedBtn');//音量键
var fullScreenBar = $('#fullScreenBar');//全屏键
var durationBar = $('#durationBar');//总进度条
var bufferBar = $('#bufferBar');//缓冲进度条
var currentBar = $('#currentBar');//播放时长进度条
var drawBar = $('#drawBar');//播放进度按钮
var durationTime = $('#durationTime');//播放总时长
var currentTime = $('#currentTime');//播放时长
var videoBody = $('#videoBody');//视频
/**
* 因为我使用的jquery,插件是不能直接调用video中的事件的
* 所以需要使用get()方法将jquery对象转化为DOM对象，
* 进而去使用video的各个事件
**/
var videoDom = videoBody.get(0);

/**
* 因为我们获取的视频时长是秒数,所以我们需要将秒数转化为我们常见的时间格式
* 下面只是万千方法中的一种，大家参考即可
**/
var initTimeLength = function (timeLength) {//根据秒数格式化时间
    timeLength = parseInt(timeLength);
    var second = timeLength % 60;
    var minute = (timeLength - second) / 60;
    return (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
};

/**
* 刷新视频,直接调用load()方法就行
**/
function load() {//刷新
    videoDom.load();
}

/**
* 播放/暂停功能 
**/
function playPause() {//播放暂停
    //paused 返回的是视频是否是暂停状态,返回的是一个布尔值
    if (videoDom.paused) {
        videoDom.play();
        //通过操作不同的class，来切换键的形态
        play.addClass('pausebtn');
    } else {
        videoDom.pause();
        play.removeClass('pausebtn');
    }
}

/**
* 音量键的开启和关闭
**/
function muted() {
    //如果为静音则开启，如果为开启状态则关闭
    videoDom.muted = !videoDom.muted;
}

/**
* 视频时间处理
**/
function playTime() {
    // loadedmetadata方法主要是判断视频是否已加载,加载完毕才能获取视频时长;
    videoBody.on('loadedmetadata', function () {
        /**
        * duration 获取视频时长，即视频秒数；
        * 这里需要调用之前已经定义好的秒数处理函数initTimeLength
        * 转换为我们常见的时间格式
        **/
        durationTime.text(initTimeLength(videoDom.duration));
    });
    // ontimeupdate 当前视频播放位置反生改变触发的事件;
    videoBody.on('timeupdate', function () {
        // 视频时长
        var durationProgress = videoDom.duration;
        // currentTime 当前播放时长
        var currentTimeProgress = videoDom.currentTime;
        // 将当前播放时长填入左边时长元素中
        currentTime.text(initTimeLength(videoDom.currentTime));
        // 求当前播放时长的进度，从而显示出来进度条
        var currentWidth = 100 * (currentTimeProgress / durationProgress);
        var currentLeft = currentWidth - ((drawBar.width() / 2) / durationBar.width() * 100);
        currentBar.animate({ width: currentWidth + '%' });
        drawBar.animate({ left: currentLeft + '%' });
    });
}
playTime();

/**缓冲进度条**/

function buffer() {
    //视频时长
    var maxduration = videoDom.duration;
    //当前缓冲进度时长结束位置
    var currentBuffer = videoDom.buffered.end(0);
    // 求取百分比
    var percentage = 100 * currentBuffer / maxduration;
    bufferBar.animate({ 'width': percentage + '%' }, 'fast');
    // 在范围内每500毫秒进行一次递归，也就是调用一下自己;
    if (currentBuffer < maxduration) {
        setTimeout(buffer, 500);
    }
}
buffer();

// 视频暂停按钮点击事件
loadBtn.on('click', function () {
    load();
    play.removeClass('pausebtn');
});
// 视频播放按钮点击事件
play.on('click', function () {
    playPause();
});

// 全屏按钮点击事件，这里兼容不是很全，有兴趣深入的朋友可以自己百度查查
fullScreenBar.on('click', function () {
    if (document.webkitFullscreenElement) {
        videoDom.webkitExitFullscreen();
    } else {
        videoDom.webkitRequestFullscreen();
    }
});
// 音量键的开启关闭
mutedBtn.on('click', function () {
    muted();
});
