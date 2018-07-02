(function () {
    /**
    * _.each 遍历
    *
    */
    //console.log(_());
    var arr = ["sname", "wq", "12", "js"];
    var obj = { "sname": "wangqi", "sage": "12", "city": "jx" };
    //类数组对象
    // 拥有一个length属性和若干索引属性的对象，key 为这种number， 且他不可以用数组的方法
    //var isArrayLikes = {"sname": "wangqi", "sage": "12", "city": "bj", length:4};
    var arrayLike = {
        0: 'name',
        1: 'age',
        2: 'sex',
        length: 3
    };

    var iteratee = function (elem, index, list) {
        //console.log(arguments)
    };
    _.each(obj, iteratee, this);


})();

(function () {
    /**
    * _.map 迭代
    *   _.map(list, iteratee, [context]) 
    *       iteratee： 1.为空    =>返回原list
    *                  2.为函数  =>则返回 iteratee内部逻辑的处理
    *                  3.为对象  =>则返回当前 对象是否和 list匹配
    *
    */
    var arr = ["sname", "wq", "12", "js"];
    var obj = { "sname": "wangqi", "sage": "12", "city": "jx" };
    var iteratee = function (elem, index, list) {
        //console.log(arguments)
        return elem 
    };
    function Func(){};
    var func = new Func();
    var hash = {"isok":"ko", "map":"mapConstr"}
    ////var objResults = _.map(obj, iteratee);
    ////console.log(objResults, "objResults ")

    var results = _.map([{ name111: 'wangqi', "city": "bj","sage22":"12","gg":"jj" }, ], { name111: 'wqhash', age111: 12, "city": "bj" });
    console.log(results, "results")


})();

(function () {
    /**
    * _.retuce 遍历
    *  该方法需要返回值： 个人认为这个方法很适合用于数字的 Math.ads(叠加)
    *  retuce(obj, iteratee, [memo,] [context]) 
    *   obj: 需要遍历的数组||对象    
    *   iteratee: 回调函数
    *           iteratee(memo, value, index, list)
    *                   memo: 初始值 value: 迭代下一个的值  index: 迭代的index list:需要遍历的数组||对象 
    *   memo: reduce函数的初始值
    *   context:  上下文对象，可以理解成this
    *       
    */
    var arr = [2, 3, 4];
    var arrayLike = {
        0: 2,
        1: 3,
        2: 4,
        length: 3
    };

    //console.log(_(), "this");
    var sum = _.reduce(arrayLike, function (memo, num, index, list) {
        //console.log(arguments);
        return memo + num;
    },0);
    //console.log(sum);
    //_.reduceWq(arr, function (memo, num) { return memo}, 0);
})();

(function () {
    /**
    * _.retuceRight 遍历
    *  该方法和_.reduce的原理差不多，不过这中是从右到左的叠加
    *       
    */
    var sum = _.reduceRight([2, 3, 4], function (memo, num, index, list) {
        return memo + num
    },0);
    //console.log(sum, "sum1+");

})();

(function () {
    /**
    * _.findIndex(arr, predicate, [context])
    *  返回匹配到参数1 中首次匹配到的下标
    *  如果没找到则 返回 -1
    */
    var arr = [1, 3, 5, 9, 8];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.find(obj, function (num) {
        return num  % 2==0;
    });
    //console.log(elem);

})();

(function () {
    /**
    * _.filter(arr, predicate, [context])
    *  返回匹配参数1 中的所有元素
    *  如果没找到则 返回 空数组
    */
    var arr= [1, 2, 4, 9, 8];
    var obj = {"sname":"wq","sage":"11"};
    var elem = _.filter(obj, function (num) {
        //console.log(arguments);
        //console.log(num)
        return num == 11;
    });
    //console.log(elem)

})();

(function () {
    /**
    * _.where(list, properties)
    *   list: 只能是对象的形式  只遍历对象
    */
    var arr = [1, 2, 4, 9, 8];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.where(obj, { "sname": "wq", "sage": "11" });
    //console.log(elem)

})();