console.log("======= 集合(collections)篇 ======");
console.log("\n====== _.each ======");
(function() {
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

    var iteratee = function(elem, index, list) {
        //console.log(arguments)
    };
    _.each(obj, iteratee, this);
})();

console.log("====== _.map ======");
(function() {
    /**
     * _.map 迭代
     *   _.map(list, iteratee, [context]) 
     *       iteratee： 1.为空    =>返回原list
     *                  2.为函数  =>则返回 iteratee内部逻辑的处理
     *                  3.为对象  =>则返回当前 对象是否和 list匹配
     *   该方法使用的时候一定要加上 return 
     */
    var arr = ["sname", "wq", "12", "js"];
    var obj = { "sname": "wangqi", "sage": "12", "city": "jx" };
    var iteratee = function(elem, index, list) {
        //console.log(arguments)
        return elem
    };

    function Func() {};
    var func = new Func();
    var hash = { "isok": "ko", "map": "mapConstr" }
    ////var objResults = _.map(obj, iteratee);
    ////console.log(objResults, "objResults ")

    var results = _.map([{ name111: 'wangqi', "city": "bj", "sage22": "12", "gg": "jj" }, ], { name111: 'wqhash', age111: 12, "city": "bj" });
    //console.log(results, "results")
    //
    var tempHash = [5,6,7,8];
    var tempHashVal = _.map(tempHash, function(val, index, list){
        return {
            "val":val,
            "index":index,
            "list":list
        }
    });

    console.log(tempHashVal, "tempHashVal");
})();

console.log("====== _.reduce ======");
(function() {
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
    var sum = _.reduce(arrayLike, function(memo, num, index, list) {
        //console.log(arguments);
        return memo + num;
    }, 0);
    //console.log(sum);
    //_.reduceWq(arr, function (memo, num) { return memo}, 0);
})();

console.log("====== _.reduceRight ======");
(function() {
    /**
     * _.retuceRight 遍历
     *  该方法和_.reduce的原理差不多，不过这中是从右到左的叠加
     *       
     */
    var sum = _.reduceRight([2, 3, 4], function(memo, num, index, list) {
        return memo + num
    }, 0);
    //console.log(sum, "sum1+");
})();

console.log("====== _.find ======");
(function() {
    /**
     * _.findIndex(arr, predicate, [context])
     *  返回匹配到参数1 中首次匹配到的下标
     *  如果没找到则 返回 -1
     */
    var arr = [1, 3, 5, 9, 8];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.find(obj, function(num) {
        return num % 2 == 0;
    });
    //console.log(elem);
})();

console.log("====== _.filter ======");
(function() {
    /**
     * _.filter(arr, predicate, [context])
     *  返回匹配参数1 中的所有元素
     *  如果没找到则 返回 空数组
     */
    var arr = [1, 2, 4, 9, 8];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.filter(obj, function(value, index, list) {
        //console.log(arguments);
        //console.log(value)
        return value == 11;
    });
    //console.log(elem)
})();

console.log("====== _.where ======");
(function() {
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
(function() {
    /**
     * _.reject(list, properties [,context])
     */
    var arr = [1, 2, 4, 9, 8];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.reject(arr, function(value) {
        return value % 2 === 0;
    });
    //console.log(elem)
})();

console.log("====== _.every ======");
(function() {

    /**
     * _.every(list [,properties] [,context])
     *  当list中的所有元素都通过 predicate的判断就返回true
     */
    var arr = [2, 4, 8, 1];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.every(arr, function(value) {
        return value % 2 === 0;
    });
    //console.log(elem);
})();

console.log("====== _.some ======");
(function() {
    /**
     * _.some(list [,properties] [,context])
     *  当list中的任何一个元素都通过 predicate的判断就返回true
     */
    var arr = [7, 3, 23, 1];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.some(arr, function(value) {
        return value % 2 === 0;
    });
    //console.log(elem);
})();

console.log("====== _.contains ======");
(function() {
    /**
     * _.contains(list [,properties] [,context])
     *  当list中的 任何一个 元素都通过 predicate的判断就返回true
     */
    var arr = [7, 3, 23, 243];
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.contains(arr, 23, 0);
    // console.log(elem);
})();

console.log("====== _.invoke ======");
(function() {
    /**
     * _.invoke(list [,methodName] [,arguments])
     *  该方法可以对list中的每一项都执行methodName,  arguments[_.invoke穿入的第2个以后的参数]将传递给 methodName函数
     *  作用=> As: 该方法可以用于对  list中的每一项进行排序  
     */
    var arr = [
        [7, 2],
        [6, 4, 5]
    ];
    var arr1 = [2, 4, 1, 8, 9, 5]
    var obj = { "sname": "wq", "sage": "11" };
    var elem = _.invoke(arr1, function() {
        return (arr1.sort());
    }, "0");
    //console.log(elem);
})();

console.log("====== _.pluck ======");
(function() {
    /**
     * _.pluck(list, propertyName)
     *   list： 指的是数组对象的形式
     *   propertyName：string 表示要在list中通过 该键名 找到 所有的键值
     */

    var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
    var elem = _.pluck(stooges, 'name');
    //console.log(elem, "elem ");
})();

console.log("====== _.max ======");
(function() {
    /**
     * _.max(list [,iteratee] [,context])
     *   list： 指的是数组或对象
     *   iteratee：迭代器，这里 _.max 方法内部 用了cb(iteratee) =>它对iteratee的形式做了不同的处理
     */

    var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
    var obj = [1, 3]
    var elem = _.max(stooges, 'age'); //有 list 有  age[iteratee]
    //var elem = _.max(obj);          //只有list
    //var elem = _.max();             // 全无 => 这时因为无list 这里会返回 -Infinity 所以需要对 list进行判断
    //console.log(elem, "elem ");
})();


console.log("====== _.min ======");
(function() {
    /**
     * _.min(list [,iteratee] [,context])
     *   list： 指的是数组或对象
     *   iteratee：迭代器，这里 _.max 方法内部 用了cb(iteratee) =>它对iteratee的形式做了不同的处理
     */

    var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
    var obj = [1, 3];
    var elem = _.min(stooges, 'age'); //有 list 有  age[iteratee]
    //var elem = _.min(obj);          //只有list
    //var elem = _.min();             // 全无 => 这时因为无list 这里会返回 -Infinity 所以需要对 list进行判断
    //console.log(elem, "elem111");
})();

console.log("====== _.size ======");
(function() {
    /**
     * [description 返回对象中元素的数量]
     * @Author   wq
     * @DateTime 2018-07-10T00:02:35+0800
     * @param    {[type]}                 obj [ 数组 类数组 对象,只要有length的属性的都可以]
     */
    var obj = { "sname": "wq", "sage": "12", "city": "bj", "sex": "man" };
    var arr = ["sname", "sage", "city", "sex", "job"];
    var str = "wnagqi";
    var size = _.size(obj);
    // console.log(size, "objSize");
    // console.log(_.size(str), "arrSize");

})();

console.log("====== _.sortBy ======");
(function() {
    var arr = [2, 3, 7, 5, 69, 0.7, 0.8];
    var newVal = _.sortBy(arr);
     console.log(newVal, "newVal");
     console.log(arr, "arr");

    var sinArr = [30, 20, 800, 90];
    var newSinArr = _.sortBy(sinArr, function(value, index, list) {     
        return value > 40;
    })
    // console.log(newSinArr, "newSinArr")
    // console.log(sinArr, "sinArr");

})();


console.log("====== .groupBy ======");
(function() {
    var arr = [4,5,6,7,8,9];
    var obj = {"sname": "wq", "sage": "12", "city": "bj"};
    var wqhash = _.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); }); 
    // console.log(wqhash, "wqhash");
})();

console.log("\n======= 数组(Array)篇 ======");
console.log("\n======= _.first ======");
(function(){
    var arr = [4,5,6,7,8];
    /**
     * [newArr _.first]
     * @type {[arr]}
     * @type {[n]}
     * 返回数组的第一个元素。 传递n参数将返回数组中第一个元素开始的n个元素。(从1开始算的)
     */
    var newArr = _.first(arr,3);
    // console.log(newArr, "newArr++")


})();

console.log("======= _.initial ======");
(function(){
    var arr = [4,5,6,7,8];
    /**
     * [newArr _.initial]
     * @type {[Array]}      arr
     * @type {[Number]} [可选参数]    n
     * 返回数组的第一个元素。 传递n参数将返回数组中第一个元素开始的n个元素。(从1开始算的)
     */
    var newArr = _.initial(arr,3);
    // console.log(arr, "arr");
    // console.log(newArr, "newArr++");


})();

console.log("======= _.last ======");
(function(){
    var arr = [4,5,6,7,8];
    /**
     * [newArr _.initial]
     * @type {[Array]}      arr
     * @type {[Number]} [可选参数]    n
     * 返回数组中最后一个元素。 传递n参数将返回数组中第一个元素开始的n个元素。(从1开始算的)
     */
    var newArr = _.last(arr);
    // console.log(arr, "arr");
    // console.log(newArr, "newArr++");
        
})();

console.log("======= _.last ======");
(function(){
    var arr = [4,5,6,7,8];
    /**
     * [newArr _.initial]
     * @type {[Array]}      arr
     * @type {[Number]} [可选参数]    n
     * 返回数组中最后一个元素。 传递n参数将返回数组中第一个元素开始的n个元素。(从1开始算的)
     */
    var newArr = _.last(arr);
    // console.log(arr, "arr");
    // console.log(newArr, "newArr++");
        
})();

console.log("======= _.rest ======");
(function(){
    var arr = [4,5,6,7,8];
    /**
     * [newArr _.initial]
     * 返回数组中除了第一个元素外的其他全部元素
     * @type {[Array]}      arr
     * @type {[Number]} [可选参数]    n
     */
    var newArr = _.rest(arr);
    // console.log(arr, "arr");
    // console.log(newArr, "newArr++");

    /**
     * _.rest 方法 和 _.initial 方法相反，
     * 但处理的过程 却只是  [].slice.call(arr, 0,index) || [].slice.call(arr, 0) 这么点区别
     */
        
})();

console.log("======= _.compact ======");
(function(){
    var arr = [null,0,false,7,""];
    /** 
     * [newArr 返回一个除去了所有false值的 array副本]
     * @type {[Array]}
     */
    var newArr = _.compact(arr);
    // console.log(newArr, "newArr");
        
})();

console.log("======= _.flatten ======");
(function(){

    /** 
     * [flatten 将数组进行扁平化， 目的：将数组进行降维]
     * @type {[Array]}
     * @type {[Bollean]}  
     */
    var arr = [1, [2], [3, [[4]]]];
    var arr1 = [[1, [2], [3, [[4]]]]];
    var arr3 = [3,4,5,6]
    // var flatten = _.flatten(arr1);
    // var flatten1 = _.flatten(arr, true);
     // console.log(flatten, "flatten");
     // console.log(flatten1, "flatten1");
   
        
})();

console.log("======= _.without ======");
(function(){

    var arr = [0,0,3,4,5,6,7,8,2,3,3,2];
    /** 
     * [without 返回一个删除所有values值后的 array副本]
     * @type {[Array]}
     * @type {[Number]} 这里的第一个参数以后的数据最好是一个Number类型的数据
     */
    var without = _.without(arr,0,2,3,4);
    // console.log(without, "without");
   
        
})();

/**
 * [返回数组去重后的副本，这里只是去重]
 * @author wq
 * @DateTime 2018-08-06T11:13:24+0800
 * @return   {[type]}                 [description]
 */
(function(){
    var arr = [5,6,3,5,4,3];
    var unique = _.uniq(arr, true);
    console.log(unique, "unique");

})();

/**
 * [返回数组去重后的副本，这里只是去重]
 * @author wq
 * @DateTime 2018-08-06T11:13:24+0800
 * @return   {[type]}                 [description]
 */
(function(){
    var arr = [22,33,22,6,7,89,6,7];
   var deleRepe = _.indexOf(arr,7,5);
   console.log(deleRepe, "deleRepe++")
})();