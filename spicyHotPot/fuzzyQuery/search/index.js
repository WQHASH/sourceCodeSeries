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