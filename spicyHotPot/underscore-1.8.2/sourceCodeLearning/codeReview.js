(function() {
    var root = this;
    var previousUnderscore = root;
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeIsArray = Array.isArray
    nativeKeys = Object.keys, // Object.keys()方法会返回( 引用类型的键名 )一个所有元素为字符串的数组
        nativeBind = FuncProto.bind,
        nativeCreate = Object.create;
    var _ = function(obj) {
        if (obj instanceof _) {
            return obj
        }
        if (!(this instanceof _)) {
            //这里体现了函数->对象的形式 也说明，既然用这种形式而不是对象的，那么可能以后会有 _() [调用方法]
            return new _(obj);
        }
        this._wrapped = obj;
    }
    //因为 underscore 也可以供后台使用 
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    };
    var optimizeCb = function(func, context, argCount) {
        if (context === void 0) {
            return func;
        }
        switch (argCount == null ? 3 : argCount) {
            case 1: return function (value) {
                return func.call(context, value);
            };
            case 2: return function (value,other) {
                return func.call(context, value, other);
            };
            case 3: return function (value, index, list) {
                return func.call(context, value, index, list);
            };
            case 4: return function (accumulator, value, index, list) {
                return func.call(context, accumulator, value, index, list);
            };
        };
        //体现代码的健壮性
        return function() {
            return func.apply(context, arguments);
        };
    };

    var cb = function (value, context, argCount) {
        if (value == null) {
            return _.identity;
        };
        if (_.isFunction(value)) {
            return optimizeCb(value, context, argCount);
        };
        if (_.isObject(value)) {
            return _.matcher(value);
        }
        //最后如果传过来的是字符串
        return _.property(value);
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    /**
    *   判断是不是数组 || 类数组
    */
    var isArrayLike = function (collrction) {
        var length = collrction != null && collrction.length;
        return typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    _.each = _.forEach = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike) {
            //数组||类数组
            for (var i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            //对象
            var keys = _.keys(obj);
            // {"sanme":"wq", "age":"12"} => ["sanme", "age"] =>
            for (var i = 0; i < keys.length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        //return 目前用不到 [可能只是这个方法以后的扩展吧]
        return obj;
    };

    /**
    * 专门用来遍历对象
    *  该方法使用的时候一定要加上 return 
    */
    _.map = _.collect = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var curretKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[curretKey], curretKey, obj);
        }
        return results;
    };

    function createReduce(dir) {
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo 
        };

        return function (obj, iteratee, memo, context) {
            //这里还需要优化处理=>可能context的指向需要改变
            iteratee = optimizeCb(iteratee, context);
            //取键名
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length, // 更严谨的处理
                // 这么处理是因为 reduce 可能从obj的index =0减少，也可能从index=length减少
                index = dir > 0 ? 0 : length - 1;
            //对memo处理，需要判断是否拥有着一参数
            if(arguments.length < 3){
                memo = obj[keys ? keys[index] : index];
                // 只有没有memo 那么index开始的下标不是2就是 倒数第2
                index += dir;
            }
            return iterator(obj, iteratee, memo, keys, index, length);
        }

    };
    
    /**
    * 功能：从左边叠加
    */
    _.reduce = _.foldl = _.inject = createReduce(1);

    /**
    * 功能：从右边叠加
    */
    _.reduceRight = _.flodr = createReduce(-1);


    _.find = _.detect = function (obj, KeywordFunc, context) {
        var key;
        if (isArrayLike(obj)) {
            key = _.findIndex(obj, KeywordFunc, context);
        } else {
            key = _.findKey(obj, KeywordFunc, context);
        }
        if (key != void 0 && key != -1) {
            return obj[key];
        }
    };


    function createIndexFinder(dir) {
        return function (array, KeywordFunc, context) {
            KeywordFunc = cb(KeywordFunc, context);
            var length = array != null && array.length;
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0,index<length; index+=dir){
                if (KeywordFunc(array[index], index, array)) {
                    return index
                } 
            }
            //没有符合条件的返回-1
            return -1;
        };

    };
    _.findIndex = createIndexFinder(1);
    _.findKey = function (obj, KeywordFunc, context) {
        KeywordFunc = cb(KeywordFunc, context);
        var keys = _.keys(obj),
            key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (KeywordFunc(obj[key], key, obj)) {
                return key;
            }
        }
    };

    /**
     *  判断是不是一个函数
     *   /./ =>类型是一个对象
     *   Int8Array =>类型是一个函数
     *   [不知道这么些的好处???] 
     */
    if (typeof /./ != "function" && typeof Int8Array != "object") {
        _.isFunction = function(obj) {
            return typeof obj == "function" || false;
        };
    };
    /**
    * 获取所有的键值
    */
    _.keys = function (obj) {
        // {"sanme":"wq", "age":"12"} => ["sanme", "age"] =>
        if (!_.isObject(obj)) {
            return []
        };
        if (nativeKeys) {
            return nativeKeys(obj);
        };
        var keys = [];
        //后动处理所有的键名 => 对于for in 循环它会将obj.prototype中的属性也一同遍历
        for (var key in obj) {
            if(_.has(obj, key)){
                return keys.push(key);
            }
        }
        return keys;
    };

    /**
    * 判断对象中的属性是不是自身的(不包括原型上的)
    */
    _.has = function (obj, key) {
        //这里换成 obj.hasOwnProperty(key) 也是一样的，不过下面这种写法较为严谨
        return obj != null && Object.hasOwnProperty.call(obj, key);
    };
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === "function" || type === "object" && !!obj;
    };
    _.identity = function(value) {
        return value
    };

    //cb第一个参数如果是对象的形式 暂时还没处理
    //_.matcher = _.matches = function (attrs) {
    //    attrs = _extendOwn({}, attrs);
        
    //};
    
    _.property = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        }
    };

}.call(this));
(function() {}).call(this);
(function() {})("arg");