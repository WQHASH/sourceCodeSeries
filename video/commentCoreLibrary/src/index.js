/*
 * @Description: 自定义视频播放器
 * @Author: wangqi
 * @Date: 2020-02-20 22:25:25
 * @LastEditTime: 2020-03-08 16:45:37
 */

(function () {

    document.addEventListener("DOMContentLoaded", function () {
        // 弹幕容器
        let myCommentStage = document.querySelector("#my-comment-stage");

        // 插入弹幕
        let addComment = document.querySelector(".add-comment");

        // 视频对象
        let video = document.querySelector(".my-video");

        // 开始结束播放
        let isPlay = false;
        let startBtn = document.querySelector(".btns .start-btn");
        let endBtn = document.querySelector(".btns .end-btn");

        // 视频进度条
        let progress = document.querySelector(".progress");
        let videoGrayProgress = document.querySelector(".progress .progress-gray");
        let videoPinkProgress = document.querySelector(".progress .progress-pink");
        let videoSlider = document.querySelector(".progress .progress-slider");

        // 进度条可达到的最大长度 (重新计算是因为,存在全屏，存在进度条的显隐此时需要重新计算Progress的width)
        let progressMaxLength = videoGrayProgress.clientWidth - videoSlider.offsetWidth;

        // 音量进度条
        let volumeProgress = document.querySelector(".volume-progress");
        let volumeGrayProgress = document.querySelector(".volume-progress .progress-gray");
        let volumePinkProgress = document.querySelector(".volume-progress .progress-pink");
        let volumeSlider = document.querySelector(".volume-progress .progress-slider");
        let controllBar = document.getElementById("controll-bar");
        let timeSpan = document.querySelectorAll("#controll-bar .tools .time span");
        // 视频播放的相关时间 -> 当前时间
        let currentTime = timeSpan[0];
        // 视频播放的相关时间 -> 全部时间
        let totalTime = timeSpan[1];

        // 音量按钮
        let volume = document.querySelector(".volume .volume-btn span");

        // 全屏
        let fullScreen = document.querySelector(".fullscreen span");

        video.addEventListener("loadedmetadata", function () {
            init();
        });

        function init() {
            // 加载弹幕
            commentManager.bind();

            // 音量滑块位置
            volumeSlider.style.left = volumeGrayProgress.clientWidth - volumeSlider.offsetWidth + "px";
            volumePinkProgress.style.width = volumeGrayProgress.clientWidth + "px";

            // 音量时间
            totalTime.innerHTML = timeFormate(video.duration);
        };

        /**
         *  播放, 暂停事件
         */
        startBtn.addEventListener("click", isPlayEvent);
        video.addEventListener("click", isPlayEvent);
        function isPlayEvent() {
            if (isPlay) {
                video.pause();
                // 暂停弹幕
                commentManager.stop();
                startBtn.classList.remove("active");
            } else {
                video.play();
                // 开启弹幕
                commentManager.start();
                startBtn.classList.add("active");
            }
            isPlay = !isPlay;
        };

        /**
         * 停止播放事件
         */
        endBtn.addEventListener("click", function () {
            videoPinkProgress.style.width = 0 + "px";
            videoSlider.style.left = 0 + "px";
            video.currentTime = 0;
            video.pause();
            // 清除弹幕
            commentManager.clear();
            startBtn.classList.remove("active");
        });

        /**
         * 视频进度滑动事件
         */
        videoSlider.addEventListener("mousedown", function (e) {
            e.stopPropagation();
            sliderEvent(e, videoSlider, videoGrayProgress, videoPinkProgress, videoScale);
        });

        /**
         * 监听视频播放事件
         */
        video.addEventListener("timeupdate", vedioProgressChange);

        /**
         * 点击进度条，改变播放进度
         */
        progress.addEventListener("mousedown", function (e) {
            // 点击的位置
            let clientX = e.offsetX;
            // 进度条显示
            videoSlider.style.left = clientX + "px";
            videoPinkProgress.style.width = clientX + "px";
            progressMaxLength = videoGrayProgress.clientWidth - videoSlider.offsetWidth;
            // 设置播放时间
            videoScale(clientX / progressMaxLength);
        });



        /**
         * 音量进度滑动事件
         */
        volumeSlider.addEventListener("mousedown", function (e) {
            e.stopPropagation();
            sliderEvent(e, volumeSlider, volumeGrayProgress, volumePinkProgress, volumeScale);
        });
        /**
         * 点击音量进度条，改变音量大小
         */
        volumeProgress.addEventListener("mousedown", function (e) {
            let clickX = e.offsetX;
            volumeSlider.style.left = clickX + "px";
            volumePinkProgress.style.width = clickX + "px";
            let maxX = volumeGrayProgress.clientWidth;
            // 设置音量大小
            volumeScale(clickX / maxX);
        });

        /**
         * 音量按钮点击事件
         */
        volume.addEventListener("click", function (e) {
            if (volume.classList.contains("active")) {
                video.muted = false;
                video.volume = 0.5;
                volumeSlider.style.left = `calc(50% - ${volumeSlider.clientWidth / 2}px)`;
                volumePinkProgress.style.width = `calc(50% - ${volumeSlider.clientWidth / 2}px)`;
                volumeScale(0.5);

            } else {
                video.muted = true;
                volumeSlider.style.left = 0 + "px";
                volumePinkProgress.style.width = 0 + "px";
            };
            volume.classList.toggle("active");
        });


        /**
         * 全屏事件 
         */
        let isFullScreen = true;
        fullScreen.addEventListener("click", function (e) {
            // if (isFullScreen) {
            //     isFullScreen = false;
            //     video.webkitRequestFullScreen();
            // } else {
            //     isFullScreen = true;
            //     video.webkitCancelFullScreen();
            // };

            if (isFullScreen) {
                if (video.requestFullscreen) {
                    // video api全屏
                    return video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    // 火狐全屏
                    return video.mozRequestFullScreen();
                } else if (video.webkitRequestFullScreen) {
                    // 谷歌全屏
                    return video.webkitRequestFullScreen();
                } else {
                    return video.msRequestFullscreen();
                }
            }

            // else {
            //     isFullScreen = true;
            //     if (video.exitFullscreen) {
            //         video.exitFullscreen();
            //     } else if (video.mozCancelFullScreen) {
            //         video.mozCancelFullScreen();
            //     } else if (video.webkitCancelFullScreen) {
            //         video.webkitCancelFullScreen();
            //     }
            // };

            fullScreen.classList.toggle("active");
            // isFullScreen = !isFullScreen;

        });

        // document.addEventListener('fullscreenchange', fullScreenChangeFn);
        /**
         * 监听屏幕变化 toggle class
         */
        function fullScreenChangeFn() {
            var isFull = document.fullscreenElement;
            isFull ? (isFullScreen = true) : (isFullScreen = false);
            fullScreen.classList.toggle("active");
        };

        /**
         * 滑块滑动事件
         * @param {Object} e 
         * @param {Dom} slider 
         * @param {Dom} grayProgress 
         * @param {Dom} pinkProgress 
         * @param {Function} callBack 
         */
        function sliderEvent(e, slider, grayProgress, pinkProgress, callBack) {
            // 初始化css位置
            let sliderStyle = window.getComputedStyle(slider);
            let beginLeft = parseInt(sliderStyle.left);

            // 初始化鼠标位置
            let beginClientX = e.clientX;

            document.addEventListener("mousemove", sliderMovemouse);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", sliderMovemouse);
            });

            function sliderMovemouse(e) {
                // 鼠标实时移动的位置
                let currentClientX = e.clientX;
                // 获取滑块位置
                let deltaX = currentClientX - beginClientX;
                let sliderLeft = beginLeft + deltaX;

                //滑块范围设置
                let maxX = grayProgress.clientWidth - slider.offsetWidth;
                sliderLeft = sliderLeft < 0 ? 0 : sliderLeft;
                sliderLeft = sliderLeft > maxX ? maxX : sliderLeft;

                // 设置滑块位置
                slider.style.left = sliderLeft + "px";
                pinkProgress.style.width = sliderLeft + "px";

                //视频播放当前时间的比例
                callBack(sliderLeft / maxX);
            };

        };

        /**
         * 视频播放的当前时间
         * @param {Number} scale 
         */
        function videoScale(scale) {
            video.currentTime = video.duration * scale;
        }

        /**
         * 视频播放的当前音量
         * @param {Number} scale 
         */
        function volumeScale(scale) {
            video.volume = scale;
        };

        /**
         * 视频进度条事件
         * @param {Object} e 
         */
        function vedioProgressChange(e) {
            // 当前播放的时间
            currentTime.innerHTML = timeFormate(video.currentTime);
            progressMaxLength = videoGrayProgress.clientWidth - videoSlider.offsetWidth;
            // 进度条和滑块事件
            let moveDis = progressMaxLength * (video.currentTime / video.duration);
            videoPinkProgress.style.width = moveDis + "px";
            videoSlider.style.left = moveDis + "px";

            // 弹幕时间
            // if (commentManager.cm.display === false) return;
            // if (video.hasStalled) {
            //     commentManager.cm.start();
            //     video.hasStalled = false;
            // }
            commentManager.cm.time(Math.floor(video.currentTime * 1000));
        };

        /**
         * 时间格式化
         * @param {Number} second 
         */
        function timeFormate(second) {
            let h, m, s;
            h = Math.floor(second / 3600);
            second -= h * 3600;

            m = Math.floor(second / 60);
            second -= m * 60;

            s = Math.floor(second);

            let time = h < 10 ? '0' + h : h;
            time += ':';
            time += m < 10 ? '0' + m : m;
            time += ':';
            time += s < 10 ? '0' + s : s;

            return time;
        }


        //=======================
        //鼠标移入事件   //鼠标移出事件
        video.addEventListener("mouseenter", function (e) {
            controllBar.style.visibility = "visible";
        });
        video.addEventListener("mouseleave", function (e) {
            controllBar.style.visibility = "hidden";
        });

        controllBar.addEventListener("mouseenter", function (e) {
            controllBar.style.visibility = "visible";
        });
        controllBar.addEventListener("mouseleave", function (e) {
            controllBar.style.visibility = "hidden";
        });

        myCommentStage.addEventListener("mouseenter", function (e) {
            controllBar.style.visibility = "visible";
        });
        myCommentStage.addEventListener("mouseleave", function (e) {
            controllBar.style.visibility = "hidden";
        });


        var someDanmakuAObj = {
            "mode": 1,
            "text": "我是插入的呀",
            "stime": 1000,
            "size": 40,
            "color": 0xff0000
        };

        // 插入弹幕
        addComment.addEventListener("click", function (e) {
            commentManager.cm.start()
            commentManager.cm.send(someDanmakuAObj);
        });




    });

})();





