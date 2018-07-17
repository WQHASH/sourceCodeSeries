(function() {

    var data = [
        "任务", "任何", "任我心",
        "将就", "将来", "将相和",
        "你呢", "你妈", "你妹",
        "我呢", "我妈", "我妹",
        "他呢", "他妈", "他妹",
    ];
    var showData = [];
    var ipt = jQuery("input");
    var btnSearch = jQuery(".btn-search");

    var vagueSearch = {
        searchKay: function() {
        	var iptVal = ipt.val();
        	var reg = new RegExp(iptVal);
            for (var i = 0; i < data.length; i++) {
            	if(reg.test(data[i])){
            		showData.push(data[i]);
            	}
            }
            console.log(showData, "showData");
        },

    };
    btnSearch.on("click", vagueSearch.searchKay);

})();

console.log("====== 循环删除数组的区别 =====");
(function () {
    var arr = [1, 2, 2, 3, 4, 5];
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        //打印数组中的情况，便于跟踪数组中数据的变化
        //console.log(i + "=" + arr[i]);
        //删除掉所有为2的元素
        if (arr[i] == 2) {
            // 注意对比这行代码：删除元素后调整i的值,如果不调整i的值，当前删除的i是没了，但是数组中i后边的元素会补上i当前的位置，
            // 而i现在又i++，那么这样就跳过当前这个元素了
            //所以需要 每次删除的时候 arr.splice(i--, 1);
            //debugger
            arr.splice(i--, 1);
        }
    }
    console.log(arr);

    //或者说从后往前开始遍历

})();
console.log("====== 循环删除数组的的理解 =====");
(function () {
    var obj = [
                { versionid: "331702270565429248", content: "cxxx" },
                { versionid: "331702270565429248", content: "c" },
                { versionid: "250066544703188992", content: "CK腾讯公司" },
                { versionid: "260702489345404928", content: "abc" },
                { versionid: "260702489345404928", content: "CK腾讯" },
                { versionid: "241093206194663424", content: "ace据我哦哦" },
                { versionid: "268925472895545344", content: "兔兔LOL5卡bac" },
                { versionid: "241093206194663424", content: "ace" },
             ];

    var newObj = [
        { versionid: "250066544703188992", content: "CK腾讯公司" },
        { versionid: "331702270565429248", content: "c" },
    ];

    for (var i = 0; i < obj.length; i++) {
        for (var j = 0; j < newObj.length; j++) {
            if (obj[i]["content"] == newObj[j]["content"]) {
                obj.splice(i--, 1); 
            }
        }
    }
    //console.log(obj, "obj+");
    //这和上边的是同一个道理，每次删除一个元素，删除元素后边的下标会顶替删除的下标，这样就会漏删除东西
})();