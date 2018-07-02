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
        //这里不用再单独对obj进行处理， _.each中已经封装处理好了
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



    _.where = function (obj, attrs) {
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


    _.indexOf = function (array, item, isSorted) {
        var i = 0, length = array && array.length;
        if (typeof isSorted == 'number') {
            // 这里用Math.max() =>实现和巧妙， 当 Math.abs(isSorted)的 长度大于length时，直接冲0开始算
            i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
        } else if (isSorted && length) {
            i = _.sortedIndex(array, item);
            return array[i] === item ? i : -1;
        }
        if (item !== item) {
            return _.findIndex(slice.call(array, i), _.isNaN);
        }
        for (; i < length; i++) if (array[i] === item) return i;
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
    *  判断对象中的属性是不是自身的（不包含prototype中的） 
    */
    _.has = function (obj, key) {       //1261
        // 用于判断 key 是不是 obj 的属性   
        // hasOwnProperty: 为了判断一个对象是否包含自定义属性而不是原型链上的属性[用hasOwnProperty很合理]
        // As: var obj = {"sname": "wq"} obj.prototype.sage = 11; "sage" in obj =>也会是true 而hashOwnProperty只会查找自身上的，不会找原型的
        return obj != null && hasOwnProperty.call(obj, key);
    };
   

    //工具方法
    // -----------------
    //start
    _.noConflict = function () {    //1270
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function (value) {
        return value;
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
    * 判断是不是一个对象 
    * 返回Bool
    */
    _.isObject = function (obj) {
       var type = typeof obj;
       return type === 'function' || type === 'object' && !!obj;
   };
   

    _.matcher = _.matches = function (attrs) {
        attrs = _.extendOwn({}, attrs);
        return function (obj) {
           return _.isMatch(obj, attrs);
       };
   };

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