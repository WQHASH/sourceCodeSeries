
var data = [
    "你好，我是Michael",
    "你是谁",
    "你最好啦",
    "你最珍贵",
    "你是我最好的朋友",
    "你画我猜",
    "你是笨蛋",
    "你懂得",
    "你为我着迷",
    "你是我的眼",
    "你好，我是Michael1xxx",
"你是谁ccc",
"你最好啦vvv",
"你最珍贵bbb",
"你是我最好的朋友nnn",
"你画我猜mmm",
"你是笨蛋qq",
"你懂得www",
"你为我着迷eee",
"你是我的眼rrr"
];

$(document).ready(function () {
    $(document).keydown(function (e) {
        e = e || window.event;
        var keycode = e.which ? e.which : e.keyCode;
        if (keycode == 38) {
            if (jQuery.trim($("#append").html()) == "") {
                return;
            }
            movePrev();

            
        } else if (keycode == 40) {
            if (jQuery.trim($("#append").html()) == "") {
                return;
            }
            $("#kw").blur();
            if ($(".item").hasClass("addbg")) {
                moveNext();
            } else {
                $(".item").removeClass('addbg').eq(0).addClass('addbg');
            }
        } else if (keycode == 13) {
            dojob();
        }
    });

    var movePrev = function () {
        $("#kw").blur();
        var index = $(".addbg").prevAll().length;
        console.log(index, "index ")
        if (index == 0) {
            //目的在于可以 从第一个直接滚到最后一个
            $(".item").removeClass('addbg').eq($(".item").length - 1).addClass('addbg');
            $("#append").scrollTop($(".item").length*27)
        } else {
            $(".item").removeClass('addbg').eq(index - 1).addClass('addbg');
            $("#append").scrollTop(index * data.length)
        }
    }

    var moveNext = function () {
        var index = $(".addbg").prevAll().length;
        if (index == $(".item").length - 1) {
            $(".item").removeClass('addbg').eq(0).addClass('addbg');
        } else {
            $(".item").removeClass('addbg').eq(index + 1).addClass('addbg');
        }
    }

    var dojob = function () {
        $("#kw").blur();
        var value = $(".addbg").text();
        $("#kw").val(value);
        $("#append").hide().html("");
    }

});

function getContent(obj) {
    // 这里的obj只向的是当前的 input
    var kw = jQuery.trim($(obj).val());
    if (kw == "") {
        $("#append").hide().html("");
        return false;
    }
    var html = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].indexOf(kw) >= 0) {
            html = html + "<div class='item' onmouseenter='getFocus(this)' onClick='getCon(this);'>" + data[i] + "</div>"
        }
    }
    if (html != "") {
        $("#append").show().html(html);
    } else {
        $("#append").hide().html("");
    }

}

function getFocus(obj) {
    $(".item").removeClass("addbg");
    $(obj).addClass("addbg");
}

function getCon(obj) {
    var value = $(obj).text();
    $("#kw").val(value);
    $("#append").hide().html("");
}
