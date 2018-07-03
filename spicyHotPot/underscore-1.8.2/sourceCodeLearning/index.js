console.log("====== _.each ======");
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

console.log("====== _.map ======");
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
    //console.log(results, "results")


})();

console.log("====== _.reduce ======");
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

console.log("====== _.reduceRight ======");
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

console.log("====== _.find ======");
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

console.log("====== _.filter ======");
(function () {
    /**
    * _.filter(arr, predicate, [context])
    *  返回匹配参数1 中的所有元素
    *  如果没找到则 返回 空数组
    */
    var arr= [1, 2, 4, 9, 8];
    var obj = {"sname":"wq","sage":"11"};
    var elem = _.filter(obj, function (value, index, list) {
        //console.log(arguments);
        //console.log(value)
        return value == 11;
    });
    //console.log(elem)

})();

console.log("====== _.where ======");
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

console.log("====== _.reject ======");
(function () {
    /**
    * _.reject(list, properties [,context])
    */
    var arr = [1, 2, 4, 9, 8];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.reject(arr, function (value) {
        return value % 2 ===0;
    });
    //console.log(elem)

})();

console.log("====== _.every ======");
(function () {
    
    /**
     * _.every(list [,properties] [,context])
     *  当list中的所有元素都通过 predicate的判断就返回true
     */
    var arr = [ 2, 4, 8, 1];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.every(arr, function (value) {
        return value % 2 === 0;
    });
    //console.log(elem);


})();

console.log("====== _.some ======");
(function () {

    /**
     * _.some(list [,properties] [,context])
     *  当list中的任何一个元素都通过 predicate的判断就返回true
     */
    var arr = [7, 3, 23, 1];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.some(arr, function (value) {
        return value % 2 === 0;
    });
    //console.log(elem);

})();

console.log("====== _.contains ======");
(function () {
    /**
     * _.contains(list [,properties] [,context])
     *  当list中的任何一个元素都通过 predicate的判断就返回true
     */
    var arr = [7, 3, 23, 243];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.contains(arr, 23, 0);
    //console.log(elem);
})();

console.log("====== _.invoke ======");
(function () {
    /**
     * _.invoke(list [,methodName] [,arguments])
     *  该方法可以对list中的每一项都执行methodName,  arguments[_.invoke穿入的第2个以后的参数]将传递给 methodName函数
     *  作用=> As: 该方法可以用于对  list中的每一项进行排序  
     */
    var arr = [[7,2], [6,4,5]];
    var arr1= [2,4,1,8,9,5]
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.invoke(arr1, function () {
        return (arr1.sort());
    },"0");
    //console.log(elem);
})();

console.log("====== _.pluck ======");
(function () {
    /**
    * _.pluck(list, propertyName)
    *   list： 指的是数组对象的形式
    *   propertyName：string 表示要在list中通过 该键名 找到 所有的键值
    */

    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    var elem = _.pluck(stooges, 'name');
    //console.log(elem, "elem ");

})();

console.log("====== _.max ======");
(function () {
    /**
    * _.max(list [,iteratee] [,context])
    *   list： 指的是数组或对象
    *   iteratee：迭代器，这里 _.max 方法内部 用了cb(iteratee) =>它对iteratee的形式做了不同的处理
    */

    var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
    var obj= [1,3]
    var elem = _.max(stooges, 'age');  //有 list 有  age[iteratee]
    //var elem = _.max(obj);          //只有list
    //var elem = _.max();             // 全无 => 这时因为无list 这里会返回 -Infinity 所以需要对 list进行判断
    //console.log(elem, "elem ");

})();


console.log("====== _.min ======");
(function () {
    /**
    * _.min(list [,iteratee] [,context])
    *   list： 指的是数组或对象
    *   iteratee：迭代器，这里 _.max 方法内部 用了cb(iteratee) =>它对iteratee的形式做了不同的处理
    */

    var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
    var obj = [1, 3];
    var elem = _.min(stooges, 'age');  //有 list 有  age[iteratee]
    //var elem = _.min(obj);          //只有list
    //var elem = _.min();             // 全无 => 这时因为无list 这里会返回 -Infinity 所以需要对 list进行判断
    //console.log(elem, "elem111");

})();


