/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-03-07 16:05:39
 * @LastEditTime: 2020-03-08 17:38:15
 */

let commentManager = (function () {
    $ = function (a) {
        return document.getElementById(a);
    };
    let cm = new CommentManager($('my-comment-stage'));
    function bind() {
        // 载入弹幕列表
        var danmakuList = [
            {
                "mode": 6,
                "text": "Hello World",
                "stime": 3000,
                "size": 25,
                "color": 0X611269,
                "border": true,
                "dur": 8000,
                "cindex": 0,
                "align ": 3,
            },
            {
                "mode": 1,
                "text": "Hello CommentCoreLibraryXX",
                "stime": 490,
                "size": 46,
                "color": "#1e1e1e",
            }
        ];
        cm.load(danmakuList);

        // 插入弹幕
        var someDanmakuAObj = {
            "mode": 1,
            "text": "根据时间来判断插入顺序y",
            "opacity": 0.5,
            "stime": 5000,
            "size": 30,
            "color": "#2980b9",
        };

        // 制作弹幕供应器
        var provider = new CommentProvider();

        // 添加一个静态弹幕源（只加载一次）
        provider.addStaticSource(CommentProvider.JSONProvider('GET', '../../data/boss.json'), CommentProvider.SOURCE_JSON)

        // 添加一个解析器
        // provider.addParser(new BilibiliFormat.XMLParser(), CommentProvider.SOURCE_JSON);
        provider.addParser(new AcfunFormat.JSONParser(), CommentProvider.SOURCE_JSON);

        // 添加一个目标 (CommentManager)
        // var cm = new CommentManager($('my-comment-container'));
        provider.addTarget(cm);

        // 加载弹幕并启动 cm
        cm.init();
        provider.load().then(function () {
            cm.start();
        }).catch(function (e) {
            alert('载入弹幕出错了！' + e);
        });

        // cm.insert(someDanmakuAObj);
        // cm.send(someDanmakuAObj)
        // 启动播放弹幕（在未启动状态下弹幕不会移动）
        // cm.start();
        // 停止播放（停止弹幕移动）
        // cm.stop();

        // 更新时间轴时间
        // cm.time(500);
        // cm.time(2000);

    };

    /**
     * 开启弹幕
     */
    function start() {
        cm.start()
    }
    /**
     * 暂停弹幕
     */
    function stop() {
        cm.stop();
    }

    /**
     * 清除弹幕
     */
    function clear() {
        cm.clear();
    }

    return { bind, start, stop, clear, cm };

})();



