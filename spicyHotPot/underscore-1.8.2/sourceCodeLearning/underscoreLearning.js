(function () {
    //wq:数据初始化的处理 start  
    var root = this;
    var previousUnderscore = root;
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var
      push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;
    var
      nativeIsArray = Array.isArray,
      nativeKeys = Object.keys, // Object.keys()方法会返回( 引用类型的键名 )一个所有元素为字符串的数组
      nativeBind = FuncProto.bind,
      nativeCreate = Object.create;

    var Ctor = function(){};

    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    };
    //wq:数据初始化的处理 end   



    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    };
    //用于 _.each 中回调函数的[优化]判断处理 => 判断了有无context[this]对象,和 argCount
    //返回一个 回调函数,用户传入的那个
    var optimizeCb = function (func, context, argCount) {
        // void 0 === "undefined"
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function (value) {
                return func.call(context, value);
            };
            case 2: return function (value, other) {
                return func.call(context, value, other);
            };
            case 3: return function (value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function (accumulator, value, index, collection) {
                // obj, iteratee, memo, keys, index, length
                //obj, iteratee, memo, keys, index, length
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };
    var cb = function (value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        // 正常来说 value传过来的是 function，如果传过来的是对象,
        if (_.isObject(value)) return _.matcher(value);
        //最后如果传过来的是字符串
        return _.property(value);
    };
    var createAssigner = function (keysFunc, undefinedOnly) {
        // function (obj) == _.extendOwn({}, attrs);
        return function (obj) {
            var length = arguments.length;
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };

    //两种创建对象
    var baseCreate = function(prototype){
        if( !_.isObject(prototype)){return {}};
        
        if(nativeCreate){
            return nativeCreate(prototype);
        };
        Ctor.prototype = prototype;
        var result = new Ctor();
        Ctor.prototype = null;
        return result; 
    };

    // pow(x, y) 方法可返回 x 的 y 次幂的值。
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function (collection) {
        var length = collection != null && collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    // propertyIsEnumerable： 判断给定的属性是否可以用 for...in 语句进行枚举。
    //var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');



    // 收藏 Functions [挂载在window下的方法]
    // ----------------
    // start
    //这里的context为可选参数
    _.each = _.forEach = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            // 数组 || 类数组
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            // 对象
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        //return 目前用不到 [可能只是这个方法以后的扩展吧]
        return obj;
    };
    _.map = _.collect = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj), 
            length = (keys || obj).length,
            //https://zhuanlan.zhihu.com/p/34772374
            //构造函数 一般需要 new Array()才能创建实例 ，但是javascript语言规范的制定者也加了可以不用new的写法
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    function createReduce(dir) {
        //iteratee (memo, value, index, list)
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                //这里用户自定义的回调执行之后，赋值给memo 所以也就明确了在用户层 回调函数的 return 是必须的
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }
        return function (obj, iteratee, memo, context) {
            //优化 iteratee函数处理
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                //这里dir传入正负值可以，处理左右不同的计算方式
                index = dir > 0 ? 0 : length - 1;
            // 如果没有提供初始值 index === 1 提供了index === 0
            if (arguments.length < 3) {
                //var obj = { "sname": "wq", "sage": 11 }; ["sname", "wq", "sage"]
                //var arr = [2,3,4];    ["0", "1", "3"]
                // 这里也区分了数组和对象的取值问题  同时也处理了memo没有值得情况下将obj中的第一条数据给memo
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }

            return iterator(obj, iteratee, memo, keys, index, length);
        };
    };
    //从左边叠加
    _.reduce = _.foldl = _.inject = createReduce(1);

    //从右边叠加
    _.reduceRight = _.foldr = createReduce(-1);

    //查找匹配的第一个元素
    _.find = _.detect = function (obj, predicate, context) {
        var key;
        if (isArrayLike(obj)) {
            key = _.findIndex(obj, predicate, context);
        } else {
            key = _.findKey(obj, predicate, context);
        }
        if (key !== void 0 && key !== -1) return obj[key];
    };

    //匹配所有的元素，过滤出满足条件的元素
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        // cd(function) =>  predicate === optimizeCb(function)=>因无第二个参数，所以 => function()===predicate
        predicate = cb(predicate, context);
        //这里不用再单独对obj类型进行处理， _.each中已经封装处理好了
        //这里的value将是obj中的每个元素，如果该元素为空的话，那么不会被push到results
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };

    // 返回 obj中没有匹配 predicate中逻辑 集合 和 filter 相反
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    };

    // 当obj中的所有元素都通过 predicate的判断就返回true
    _.every = _.all = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            // 在这里处理了，如果有1次不满足则返回false,那么循环外边的return也就不执行了
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };

    _.some = _.any = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    };

    // 确定数组或对象中是否包含给定的值
    // 如果obj中包含指定的target 则返回true, obj可能是对象，或数组
    _.contains = _.includes = _.include = function (obj, target, fromIndex) {
        if (!isArrayLike(obj)) obj = _.values(obj);
        return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
    };

    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            var func = isFunc ? method : value[method];
            return func == null ? func : func.apply(value, args);
        });
    };

    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };

    // obj =>  [{},{}]这种形式
    _.max = function (obj, iteratee, context) {
        var result = -Infinity, lastComputed = -Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            //cb(iteratee): 当iteratee是一个String 返回一个 _.property("StrSearch")函数，
            //该函数有返回一个函数 => fn(obj){return obj[key]}
            iteratee = cb(iteratee, context);
            // value: 该值是一个对象
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    
    /**
     * 功能：返回obj中最小的值，
     *       iteratee将作为list中每个值的排序依据
     */
    _.min = function(obj, iteratee, context) {
        var result = Infinity,
            lastComputed = Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };  



    /**
     * [sortBy 排序]
     * @Author   wq
     * @DateTime 2018-07-14T12:35:46+0800
     * @param    {[Object || Array]}                 obj      [description]
     * @param    {[Function]}                 iteratee [迭代器]
     * @param    {[type]}                 context  [上下文环境]
     */
    _.sortBy = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            };
        }).sort(function (left, right) {
            // 本质上还是用数组原生的 sort来实现的
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1; 
            }
            return left.index - right.index;
        }), 'value');
    };


    var group = function (behavior) {
        return function (obj, iteratee, context) {
            var result = {};
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };

    _.groupBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key].push(value); else result[key] = [value];
    });

    _.toArray = function(obj){
        if(!obj){return []};
        if(_.isArray(obj)){ return slice.call(obj) };
        if(isArrayLike(obj)){ return _.map(obj, _.identity) };
        return _.values(obj);
    };

    _.size = function (obj) {
        if (obj == null) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };    
    
    //======================================== 数组(Array) ========================================
    /**
     * @author wq
     * @DateTime 2018-07-18T16:04:52+0800
     * 返回数组中的第一个
     * @param    {[Array]}                 array [需要截取的数组]
     * @param    {[Number]}                 n     [截取的返回，从1开始算的，可选参数]
     * @param    {[Number]}                 guard [该参数暂时不清楚]
     * @return   {[Array]}                       [返回一个新数组]
     */
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
    };
    /**
     * @author wq
     * @DateTime 2018-07-18T16:04:52+0800
     * 返回 除了 数组中的 最后一个
     * @param    {[Array]}                 array [需要截取的数组]
     * @param    {[Number]}                 n     [截取的返回，从1开始算的]
     * @param    {[Number]}                 guard [该参数暂时不清楚]
     * @return   {[Array]}                       [返回一个新数组]
     */
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };

    /**
     * @author wq
     * @DateTime 2018-07-18T16:04:52+0800
     * 返回数组中的最后一个
     * @param    {[Array]}                 array [需要截取的数组]
     * @param    {[Number]}                 n     [截取的返回，从1开始算的]
     * @param    {[Number]}                 guard [该参数暂时不清楚]
     * @return   {[Array]}                       [返回一个新数组]
     */    
    _.last = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };
    
     // 返回数组中 除了 第一个 元素外的其他全部元素
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };

    // 返回一个出去所有false值的副本
    _.compact = function (array) {
        // 该方法的重点在于_.filter 中的_.filter方法进行了处理（如果迭代的元素为空的话，改迭代方法不会push到显示的副本数组中）
        return _.filter(array, _.identity);
    };

    /** 
     * [flatten 对数组的扁平化处理]
     * @author wq
     * @DateTime 2018-07-19T13:43:39+0800
     * @param    {[Array]}                   input      [description]
     * @param    {[Bollean]}                 shallow    [description]
     * @param    {[Bollean]}                 strict     [-----------这个参数暂时没搞明白？--------]
     * @param    {[undefined]}               startIndex [这个值在这里，第一起到的变量undefined作用，第二也是为了Argument参数的值从第二个开始]
     * @return   {[type]}                            [description]
     */
    var flatten = function (input, shallow, strict, startIndex) {   
        var output = [], idx = 0;
        for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
            var value = input[i];
            //_.isArguments是对类数组的处理，但这个方法没看明白
            // if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
            if (isArrayLike(value) && (_.isArray(value) )) {
                //flatten current level of array or arguments object
                //wq 无strict的处理 （递归处理，value的中每个元素都不在是数组）
                if (!shallow) value = flatten(value, shallow, strict);

                // 这里取到迭代中的每个元素中的长度，然后每次对每个元素进行处理,直到for循环结束
                var j = 0, len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++];
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    };
    /**
     * [flatten 对数组的扁平化处理]
     * @author wq
     * @DateTime 2018-07-19T13:33:07+0800
     * @param    {[Array]}                 array   [进行处理的 数组||类数组]
     * @param    {[Bollean]}   [可选]              shallow [true: 只是将数组降一维， 默认false:将数组中的每个元素都降维，扁平化]
     * @return   {[Array]}                         [返回扁平化后的数组]
     */
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false);
    };




    _.difference = function (array) {
        // 作用，对arguments进行扁平化，且只降一次维度，拿到用户调用 _.without(arr,arg1,arg2..)第二以后的参数
        var rest = flatten(arguments, true, true, 1);
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        });
    };

    /**
     * [without 返回一个删除所有values值后的 array副本]
     * @author wq
     * @DateTime 2018-07-19T13:48:01+0800
     * @param    {[Array]}                 array [description]
     * @return   {[Array]}                       [description]
     */
    _.without = function (array) {
        // 如果传递进来的第一个以后的参数是数组 这里的slice.call(arguments, 1) 又会在数组的外层包裹一层数组
        // 因为调用的过程 [].slice.call() 他是这么调用的，在空数组来slice选中的是第一个后，数据也会被放进这个空数组中
        return _.difference(array, slice.call(arguments, 1));
    };



    /**
     * [unique 返回数组去重后的副本，]
     * @author wq
     * @DateTime 2018-08-06T11:38:18+0800
     * @param    {[Array]}                 array    [需要去重的数组]
     * 个人暂时认为以下参数意义不是特别大
     * 改方法的核心 体现在 _.contains(data, targetData) 处理是否存在相同数据
     * @param    {Boolean}                isSorted [description]
     * @param    {[type]}                 iteratee [description]
     * @param    {[type]}                 context  [description]
     * @return   {[type]}                          [description]
     */
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
        if (array == null) return [];
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i],
                computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted) {
                if (!i || seen !== computed) result.push(value);
                seen = computed;
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                result.push(value);
            }
        }
        return result;
    };


    _.union = function () {
        return _.uniq(flatten(arguments, true, true));
    };











    _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };



    _.negate = function (predicate) {
        //这里返回的函数中的参数 是  _.filter => predicate() 调用时接受到的参数，所以这里形参虽然没有，但argument并不是空的
        return function () {
            // 返回 除满足 predicate 条件之外的
            return !predicate.apply(this, arguments);
            //return !predicate(arguments)

            // 返回 满足 predicate 条件的
            //return !predicate.apply(this, arguments);
        };
    };

    /**
     * [object 将数组转换为对象的形式]
     * @author wq
     * @DateTime 2018-10-18T10:44:25+0800
     * @param    {[Array]}                 list   [用来最为键名]
     * @param    {[Array]}                 values [用来最为键值]
     * @return   {[type]}                        [返回组织好的对象]
     */
    _.object = function(list, values){
        var result = {};
        for(var i=0, length=list&&list.length; i<length; i++){
            if(values){
                // list: []  values:[]
                result[list[i]] = values[i];
            }else{
                // list: [['moe', 30], ['larry', 40], ['curly', 50]] 是有格式限制的
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    /**
     * [indexOf 返回value在该 array 中的索引值]
     * @author wq
     * @DateTime 2018-07-19T14:00:09+0800
     * @param    {[Array]}                 array    [查询的数组]
     * @param    {[Number]}                 item    [目标数组]
     * @param    {Boolean}                isSorted  [传递isSorted将从你给定的索性值开始搜索]
     * 这里的重点在于第三个参数 isSorted 的处理
     */
    _.indexOf = function (array, item, isSorted) {
        var i = 0, length = array && array.length;
        if (typeof isSorted == 'number') {
            // 这里用Math.max() =>实现和巧妙， 当 Math.abs(isSorted)的 长度大于length时，直接从0开始算
            i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
        } else if (isSorted && length) {
            // 这里用二分法进行查找，[个人感觉这里的用处不大，第三个参数有无都行，]
            i = _.sortedIndex(array, item);
            return array[i] === item ? i : -1;
        }
        if (item !== item) {
            // slice.call(array, i) 这里可能是为了确保得到的一定是数组
            return _.findIndex(slice.call(array, i), _.isNaN);
        }
        for (; i < length; i++) if (array[i] === item) return i;
        return -1;
    };

    /**
     * [lastIndexOf 返回value在该 array 中的索引值 和 _.indexOf查询顺序相反 ]
     * @author wq
     * @DateTime 2018-10-18T11:38:17+0800
     * @param    {[type]}                 array [description]
     * @param    {[type]}                 item  [description]
     * @param    {[type]}                 from  [description]
     * @return   {[type]}                       [description]
     */
    _.lastIndexOf = function (array, item, from) {
        var idx = array ? array.length : 0;
        if (typeof from == 'number') {
            idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
        }
        if (item !== item) {
            return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
        }
        while (--idx >= 0) if (array[idx] === item) return idx;
        return -1;
    };

    //检索 对象的属性值
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };


    function createIndexFinder(dir) {
        return function (array, predicate, context) {
            predicate = cb(predicate, context);
            var length = array != null && array.length;
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        };
    }

    _.findIndex = createIndexFinder(1);
    //_.findLastIndex = createIndexFinder(-1);
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj), key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    };
    /**
     * [sortedIndex 用二分查找确定value在list中的下标，不管value存不存在于list中（如果没有，改方法会计算出合理的位置）]
     * @author wq
     * @DateTime 2018-08-06T15:45:01+0800
     * @param    {[Array]}                 array    [数组]
     * @param    {[type]}                 obj      [目标元素]
     * @param    {[type]}                 iteratee [description]
     * @param    {[type]}                 context  [description]
     * @return   {[type]}                          [description]
     */
    _.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = Math.floor((low + high) / 2); 
            // if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
            if (iteratee(array[mid]) < value) {
                low = mid + 1;
            } else{
                high = mid;
            }
        }
        return low;
    };


    //======================================== 函数(Function) ========================================
    //只是看了对象的创建部分
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args){
        if(!(callingContext instanceof boundFunc)){
            return sourceFunc.apply(context, args);
        };
        var self = baseCreate(sourceFunc.prototype);
        var result = sourceFunc.apply(self, args);
        if (_.isObject(result)) return result;
        return self;
    };

    /**
     * [bind 绑定函数 function 到对象 object 上, 也就是无论何时调用函数, 函数里的 this 都指向这个 object.任意可选参数 ]
     * @author wq
     * @DateTime 2018-10-19T13:43:55+0800
     * @param    {[Function]}                 func    [需要使用的函数]
     * @param    {[Object]}                 context [被this指向的对象]
     * @return   {[type]}                         [description]
     */
    _.bind = function(func, context){
        if(nativeBind && func.bind === nativeBind){
            // return func(){}.bind(this [, ...args]);
            return nativeBind.apply(func, slice(arguments, 1));
        };
        if(!_isFunction(func)){
            throw new TypeError("Bind must be called on a function");
        };
        var args = slice.call(arguments, 2);
        var bound = function(){
            return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
        };
        return bound;
    };

    // 同时给多个方法绑定this 但是这种操作会受到该定义方法体的限制 [只能按定义好的规则使用]
    _.bindAll = function(obj){
        var i, length = arguments.length, key;
        if(length<=1){
            throw new Error("bindAll must be passed function names");
        };
        for(i=0;i<length;i++){
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        };
        return obj;
    };

    /**
     * [delay 类似setTimeout，等待wait毫秒后调用function]
     * @author wq
     * @DateTime 2018-10-19T15:06:14+0800
     * @param    {[Function]}                 func [回调函数]
     * @param    {[Number]}                 wait [延迟时间]
     * @return   {[type]}                      [description]
     */
    _.delay = function(func, wait){
        var args = slice.call(arguments, 2);
        return setTimeout(function(){
            return func.apply(null, args);
        }, wait);
    };

    // _.defer = _.partial(_.delay, _, 1);
    
    /**
     * [throttle 函数节流 ，多少秒之内执行一次]
     * @author wq
     * @DateTime 2018-10-22T09:34:17+0800
     * @param    {[type]}                 func    [description]
     * @param    {[type]}                 wait    [description]
     * @param    {[type]}                 options [description]
     * @return   {[type]}                         [description]
     *           temp： https://blog.csdn.net/wangfengqingyang/article/details/39519609 临时加上!!!
     */
    // 用这个时间差来计算，而不是直接用wait 说明，开始的计算点是从第一次触发函数时，到第二次触发这段时间是包含wait 之内的。
            // 不在wait的计算 ,就直接重新计算，把上次的时间改为当前时间
            //在wait范围内的计算

    _.throttle = function(func, wait, options){
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if(!options){ options = {} };
        var later = function(){
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            //清空优化
            if(!timeout){ context = args = null};
        };

        return function(){ 
            var now = _.now();
            if(!previous && options.leading === false){
                previous = now;    
            }; 
            var remaining = wait - (now-previous);   
            context = this;
            args = arguments;
            //点击在wait时间之外（点击太慢）
            if(remaining<=0 || remaining>wait){
                if(timeout){
                    clearTimeout(timeout);
                    timeout = null;    
                }
                previous = now;
                result = func.apply(context,args);
                //清空优化
                if(!timeout){ context = args = null};    
                // 关于 == 的理解， (Boolean,Number,String前提下)当左右两边不是同类型时，会将两边转成Number类型在进行比较 [犀牛书==的理解， 配合上边写的网址]
                // JS中简单类型与引用类型进行 == 引用类型会调用 toString，返回一个值比较，没有的话再找valueOf返回一个值比较
                // =====隐式转换的特殊规则：======
                //  !!!很重要 =>  [要比较相等性之前，不能将 null 和 undefined 转换成其他任何值。说明null,undefined和其他类型比较都为false]
                 //点击在wait时间之内（点击太快）
            }else if(!timeout && options.trailing !== false){
                // console.log(options.trailing !== false,"options")
                timeout = setTimeout(later, remaining);
            };

            return result;
        };

    };
    
    /**
     * [bebounce 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后. ]
     *  AS: 游览器窗口的 [resize事件] 改变时，只会执行指定wait时间之后的一次  [默认没有第三个参数前提下]
     * @author wq
     * @DateTime 2018-10-24T16:05:39+0800
     * @param    {[type]}                 func      [description]
     * @param    {[type]}                 wait      [description]
     * @param    {[type]}                 immediate [description]
     * @return   {[type]}                           [description]
     */
    _.bebounce = function(func, wait, immediate){
        var timeout, args, context, timestamp, result;

        var later = function(){
            var last = _.now() - timestamp;

            if(last<wait && last >=0){
                timeout = setTimeout(later, wait - last);
            }else{
                timeout = null;
                if(!immediate){
                    result = func.apply(context, args);
                    if(!timeout){
                        context = args = null;
                    }
                }
            }
        };

        return function(){
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if(!timeout){ timeout = setTimeout(later, wait)};
            if(callNow){
                result = func.apply(context, args);
                context = args = null;
            };

            return result;
        };
    };

    /**
     * [after 创建一个函数, 只有在运行了 count [times] 次之后才有效果]
     * @author wq
     * @DateTime 2018-10-25T14:39:40+0800
     * @param    {[Number]}                 times [需要运行的次数]
     * @param    {[Fuction]}                 func  [运行的方法]
     * @return   {[type]}                       [description]
     * 注意点： ①：var a = --n 和 ②：n-- 的区别 
     * 计算过程： ①中先算 var a = n-1;  n = n-1;
     *         ②中先算 var a = n; n = n-1;
     *         这里的举例是等号，对于下面的 大小于号 也是同样的计算道理[计算优先级];
     *
     *  配合理解点： 这里也形成了闭包，虽然times这个参数是从外部传递过来的
     *              但是这对于 _.after中的匿名函数来说他向上找，是在他的上一层找到的，
     *              且每次的调用 var after = _.after()都只是在调用匿名函数，且times的值被保留了，_.after只存在第一次的压栈
     */
    _.after = function(times, func){
        return function(){
            if(--times<1){
                return func.apply(this, arguments);    
            }
        };
    };

    /**
     * [before 创建一个函数,调用不超过count 次。 当count已经达到时，最后一次的调用可以为我们自身规定的方法]
     * @author wq
     * @DateTime 2018-10-25T15:17:08+0800
     * @param    {[Number]}                 times [能被调用的次数]
     * @param    {[Function]}                 func  [调用的方法]
     * @return   {[type]}                       [description]
     */
    _.before = function(times, func){
        var memo;
        return function(){
            if(--times > 0){
                memo = func.apply(this, arguments);
            }
            if(times<=1){ func = null};
            return memo;
        };
    };

    /**
     * [negate 返回一个新的predicate函数的否定版本]
     * @author wq
     * @DateTime 2018-10-25T15:39:10+0800
     * @param    {[Function]}                 predicate [指定一个函数]
     * @return   {[type]}                           [description]
     */
    _.negate = function(predicate){
        return function(){
            return !predicate.apply(this, arguments);
        }
    };

    /**
     * [compose 组合函数 =>这里需要多看看 函数组合与柯里化 ]
     * @author wq
     * @DateTime 2018-10-25T16:44:40+0800
     * @return   {[type]}                 [description]
     */
    _.compose = function(){
        var args = arguments;
        var start = args.length -1;
        return function(){
            var i = start;
            var result = args[start].apply(this, arguments);
            // 网上介绍的这里一般用reduceRight这种方法去做   [这里可以配合犀牛书理解 ++i 和 i++ 的区别]
            while (i--) {
                result = args[i].call(this, result);
            }
            return result;
        };

        // === 网上的版本 ===
        // var args = Array.prototype.slice.call(arguments);
        // var len = args.length - 1
        // return function (x) {
        //     return args.reduceRight(function (res, cb) {
        //         return cb(res)
        //     }, x)
        // }
    };


    /**
    *  将参数返回 只取对象的键名 Object.keys
    */
    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        // 手动处理  Object.keys  =>也是对数组的处理
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        // wq: 暂时不考虑 低版本
        //if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };
    // 这里传递的是是 实参
    // 注意：createAssigner函数内部有return 当别处调用 _.extendOwn(arg) == createAssigner(_.keys)(arg)
    _.extendOwn = _.assign = createAssigner(_.keys);
    _.isMatch = function (object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };
    /**
     * [isNaN 判断是不是NaN] NaN是一个不等自身的数
     *  这里的_.isNumber在 :704行 动态遍历生成 
     *  和原生的不同在于 _.isNumber 值处理number类型，对于undefined的返回false,而不是true
     * @author wq
     * @DateTime 2018-07-19T17:44:31+0800
     * @param    {[type]}                 obj [一个值]
     * @return   {Boolean}                    [description]
     */
     _.isNaN = function (obj) {
        return _.isNumber(obj) && obj !== +obj;
    };

    /** 
     * [isBoolean 判断是不是Boolean]
     * @author wq
     * @DateTime 2018-07-20T11:03:32+0800
     * @param    {[type]}                 obj [description]
     * @return   {Boolean}                    [返回一个Bool值]
     */
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    /**
    *  判断对象中的属性是不是自身的（不包含prototype中的）
    */
    _.has = function (obj, key) {       //1261
        // 用于判断 key 是不是 obj 的属性
        // hasOwnProperty: 为了判断一个对象是否包含自定义属性而不是原型链上的属性[用hasOwnProperty很合理]
        // As: var obj = {"sname": "wq"} obj.prototype.sage = 11; "sage" in obj =>也会是true 而hashOwnProperty只会查找自身上的，不会找原型的
        return obj != null && hasOwnProperty.call(obj, key);
    };


    //======================================== 实用功能(Utility) ========================================
    // _.noConflict = function () {    
    //     root._ = previousUnderscore;
    //     return this;
    // };
    _.identity = function (value) {
        return value;
    };

    /**
     * [constant 创建一个函数，这个函数 返回相同的值 用来作为_.constant的参数。]
     *     *这里是一个闭包很好的例子  As: var a=1; var b= _.constant(a); a=2; b();b()这里的传入的参数已经形成闭包了，
     *     *整体也形成了闭包，当在改变a的值，和函数内部的没有关系了
     * @author wq
     * @DateTime 2018-10-31T15:36:54+0800
     * @param    {[类型不定]}                 value [需要保存的值]
     * @return   {[类型不定]}                       [返回和传入的全等]
     */
    _.constant = function (value) {
        return function () {
            return value;
        }
    };

    /**
     * [noop 返回undefined，不论传递给它的是什么参数。 可以用作默认可选的回调参数。]
     * @author wq
     * @DateTime 2018-10-31T15:41:17+0800
     * @return   {[type]}                 [description]
     */
    _.noop = function () { };

     /**    
      * [times 调用给定的迭代函数n次,每一次调用iteratee传递index参数。生成一个返回值的数组。 ]
      * @author wq
      * @DateTime 2018-10-31T15:58:54+0800
      * @param    {[Number]}                 n        [调用的次数]
      * @param    {[Function]}                 iteratee [执行的函数]
      * @param    {[Object]}                 context  [上线文环境]
      * @return   {[Array]}                          [函数返回的值，形成一个数组]
      */
    _.times = function(n, iteratee, context){
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for(var i=0; i<n; i++){
            //   iteratee(i) 如果这里的而第一个参数加上，那么在方法体里就需要用定义了,暂时没明白这个参数何用
            accum[i] = iteratee(i);
        }
        return accum;
    };

    /**
     * [random 生成一个随机数]
     * Math.random()的范围： [1,10)  是取不到最大值的所以需要 +1
     * @author wq
     * @DateTime 2018-10-31T16:02:14+0800
     * @param    {[Number]}                 min [最小值]
     * @param    {[Number]}                 max [最大值]
     * @return   {[Number]}                     [生成的随机数]
     */
    _.random = function(min, max){
        if(max == null){
            max = min;
            min = 0;
        }; 
        return min + Math.floor(Math.random() * (max-min+1));
     };

    _.now = Date.now || function () {
        return new Date().getTime();
    };


    /**
    * 判断是不是一个函数
    * 返回Bool
    */
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
    };

    /**
    * 判断是不是一个数组
    * 返回Bool
    */
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };

    /**
    * 判断是不是一个对象 =>对于函数也是也是对象做了处理，所以选择了这种方式判断 
    * 返回Bool
    */
    _.isObject = function (obj) {
       var type = typeof obj;
       return type === 'function' || type === 'object' && !!obj;
   };

   /**  
    * [手动添加了一些 js类型判断的方法]
    * 
    */
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });


    //  if (!_.isArguments(arguments)) {
    //     _.isArguments = function (obj) {
    //         return _.has(obj, 'callee');
    //     };
    // }

    _.matcher = _.matches = function (attrs) {
        attrs = _.extendOwn({}, attrs);
        return function (obj) {
           return _.isMatch(obj, attrs);
       };
   };

   /**
    * [description 将当前时间转为毫秒值]
    * @author wq
    * @DateTime 2018-10-22T09:29:57+0800
    * @return   {[type]}                 [description]
    */
   _.now = Date.now || function(){
        return new Date().getTime();
   }

    /**
    *  处理属性的方法
    *  key是一个动态的值   _.property(key)(arr)
    */
   _.property = function (key) {
       return function (obj) {
           return obj == null ? void 0 : obj[key];
       };
   };


}.call(this));
