/*
 * @Description: wqhash-inderscore.js
 * @Author: wangqi
 * @Date: 2019-10-20 16:13:33
 * @LastEditTime: 2019-11-04 23:19:39
 */
(function () {
    /**
     * @description: 
     * 1: self 和 this的区别: 
     *      self指的是窗口本身，它返回的对象始终是window对象；
     *      this指的是函数调用用对象, (具体参考你不知道的js)
     *          --所以self这种只是this的一种形式而已
     * 2: 这种模式的得到结果并不是Boolean, 因为是以 &&self这种结尾的；所以取到的为self
     */
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global) ||
        (this) ||
        {};

    var previousUnderscore = root._;

    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol != 'undefined' ? Symbol.prototype : null;

    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;


    // 创建一个空的方法,用于实现Object.create的继承用
    var Ctor = function () { };

    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    // 通过把属性挂载在全局window对象上暴露出去
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    _.VERSION = '1.9.1';


    /**
     * @description: 优化后的回调 (对第一个参数只能是函数, 以及参数个数进行了优化处理)
     *                  -- 这里有bind简易版实现的影子 --
     * @param {func}        回调函数
     * @param {context}     上下文对象
     * @param {argCount}    调用optimizeCb返回函数需要传递的参数的个数
     * @return: 
     */
    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) { return func }
        switch (argCount == null ? 3 : argCount) {
            case 1: return function (value) {
                return func.call(context, value)
            };

            case 3: return function (value, index, collection) {
                return func.call(context, value, index, collection)
            };
            // 给reducer 使用
            case 4: return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection)
            };
        }
        // 默认的形式
        return function () {
            return func.apply(context, arguments);
        }
    };

    var cb = function (value, context, argCount) {
        if (_.iteratee !== builtinIteratee) {
            return _.iteratee(value, context);
        }

        if (value == null) { return _.identity }

        if (_.isFunction(value)) {
            return optimizeCb(value, context, argCount);
        }

        if (_.isObject(value) && !_.isArray(value)) {
            return _.matcher(value);
        }
    };

    // 用于cb的健壮性的处理
    _.iteratee = builtinIteratee = function (value, context) {
        return cb(value, context, Infinity);
    };

    /**
     * @description: 类似Es6中 rest语法的实现
     * @param {type} 
     * @return: 
     */
    var restArguments = function (func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function () {
            var length = Math.max(arguments.length - startIndex, 0),
                rest = Array(length),
                index = 0;
            for (; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
                case 2: return func.call(this, arguments[0], arguments[1], rest);
            }
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
            args[startIndex] = rest;
            return func.apply(this, args);
        };
    };

    /**
     * @description: 创建对象用于继承, 也是对 Object.create方法的兼容处理
     * @param prototype {Object} 用来继承的对象 
     * @return: 
     */
    var baseCreate = function (prototype) {
        if (!_isObject(prototype)) {
            return {};
        }
        if (nativeCreate) {
            return nativeCreate(prototype)
        }
        Ctor.prototype = prototype;
        var result = new Ctor();
        // 这里赋上null的原因是, 保障库中每次用完Ctor后都是一个干净无污染的方法 (以及他的prototype属性);
        // 是利用了引用指针关系, 开辟了两个原型了, result的任然指向的最开始的 (不会随之改变);
        Ctor.prototype = null;
        return result
    };

    /**
     * @description: 获取对象中属性
     * @param key {String} 属性名称
     * @return: 
     */
    var shallowProperty = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key]
        }
    };

    /**
     * @description: 判断是否是私有属性
     * @param obj {Object}  对象 
     * @param path {String} 键名
     * @return: 
     */
    var has = function (obj, path) {
        return obj !== null && hasOwnProperty.call(obj, path);
    };

    /**
     * @description: 获取对象的属性值
     * @param key {String} 
     * @return: 
     */
    var shallowProperty = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        }
    };

    /**
     * @description: 深度获取数组中的属性值, 但是需要注意顺序问题
     *                  该方法主要配合 _.property方法使用
     * @param obj {对象}    var stooges = {moe: {fears: 12, curly: {fears: {worst: 'Moe'}}};
     * @param path {数组} 使用对象的key组成的数组 path = ['curly', 'fears', 'worst'];
     * @return: 返回path属性指定的值
     */
    var deepGet = function (obj, path) {
        var length = path.length;
        for (var i = 0; i < length; i++) {
            if (obj == null) { return void 0 }
            //  这里配合数组给定顺序的key, 每次匹配上都缩进一个对象
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = shallowProperty('length');
    //判断是否为一个类数组对象 特点： ①: 它将实参以数组的形式保存着； ②: 有length属性
    // var a={"0":"a","1":"b","2":"c",length:3}; 
    var isArrayLike = function (collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };


    // 集合 Functions
    // ----------------------------------------
    /**
     * @description: 遍历 forEach
     * @param obj {Object}          遍历对象(数组)
     * @param iteratee {Function}   迭代器
     * @param context {Object}      作用域
     * @return: 
     */
    _.each = _.forEach = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj)
            }
        } else {
            // 这里是用来专门处理数组或者对象, 所以用这种keys来遍历; (而不是纯下标)
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj)
            }
        }
        return obj;
    };

    /**
     * @description: 遍历 map
     * @param obj {Object}          遍历对象(数组)
     * @param iteratee {Function}   迭代器
     * @param context {Object}      作用域
     * @return: 
     */
    _.map = _.collect = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);

        for (var index = 0; index < length; index++) {
            // 这里主要是为了兼容 Object, Array, isArrayLike三种类型都能使用
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    /**
     * @description: 遍历 reduce
     * @param dir {Number} 执行的方向
     * @return: 
     */
    var createReduce = function (dir) {
        var reducer = function (obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            if (!initial) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        };

        return function (obj, iteratee, memo, context) {
            var initial = arguments.length >= 3;
            return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
        };
    };

    _.reduce = _.foldl = _.inject = createReduce(1);

    _.reduceRight = _.foldr = createReduce(-1);

    /**
     * @description: 返回满足回调函数条件的第一个值
     * @param obj {集合}             数组或者对象
     * @param predicate {Function}   回调函数
     * @param context {Object}       上下文对象
     * @return: 
     */
    _.find = _.detect = function (obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context);
        if (key !== void 0 && key !== -1) {
            return obj[key];
        }
    };

    /**
     * @description: 过滤; 返回满足回调函数条件的所有值
     * @param obj {集合}             数组或者对象
     * @param predicate {Function}   回调函数
     * @param context {Object}       上下文对象
     * @return: 
     */
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) {
                results.push(value);
            }
        });
        return results;
    }


    _.where = function (obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };

    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    };

    /**
     * @description: 和过滤相反; 返回不满足回调函数条件的所有值
     * @param obj {集合}             数组或者对象
     * @param predicate {Function}   回调函数
     * @param context {Object}       上下文对象
     * @return: 
     */
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    };

    /**
     * @description: 集合所有元素都要满足回调函数条件才返回true
     * @param {type} 
     * @return: 
     */
    _.every = _.all = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj);
        length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) {
                return false;
            }
        }
        return true;
    };

    /**
     * @description: 只要集合中元素有一个满足回调函数条件就返回true
     * @param {type} 
     * @return: 
     */
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

    /**
     * @description: 类似Es6中的 Array.includes()
     * @param {type} 
     * @return: 
     */
    _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
        if (!isArrayLike(obj)) {
            obj = _.values(obj);
        }
        if (typeof fromIndex != 'number' || guard) {
            fromIndex = 0;
        }
        return _.indexOf(obj, item, fromIndex) >= 0;
    };



    // 集合 Functions
    // ----------------------------------------


    // 数组 Functions
    // ---------------------------------------- 
    var createPredicateIndexFinder = function (dir) {
        /**
         * @description: 返回 predicate[回调函数]逻辑判断中满足条件的key, 不满足则返回undefined
         * @param array {Array}             检查集合
         * @param predicate {Function}      回调函数
         * @param context {Object}          上下文对象
         * @return: 
         */
        return function (array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) {
                    return index;
                }
            }
            return -1;
        }
    };

    /**
     * @description: 满足条件回调返回的第一个数组中的下标
     * @param {type} 
     * @return: 返回的索引值
     */
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);

    _.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
        }
        return low;
    };

    var createIndexFinder = function (dir, predicateFind, sortedIndex) {
        return function (array, item, idx) {
            var i = 0, length = getLength(array);
            if (typeof idx == 'number') {
                if (dir > 0) {
                    i = idx >= 0 ? idx : Math.max(idx + length, i);
                } else {
                    length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item);
                return array[idx] === item ? idx : -1;
            }
            if (item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN);
                return idx >= 0 ? idx + i : -1;
            }
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
                if (array[idx] === item) return idx;
            }
            return -1;
        };
    };
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

    // 数组 Functions
    // ----------------------------------------


    // 函数 Functions
    // ----------------------------------------
    /**
     * @description: 获取对象的所有key值 [提供给_.property使用]
     * @param obj {Object} 
     * @return: 
     */
    _.keys = function (obj) {
        if (!_.isObject(obj)) {
            return [];
        };
        // 利用 Object.keys()方法
        if (nativeKeys) {
            return nativeKeys(obj)
        };
        var keys = [];
        //处理数组的情况  (这里就不考虑ie<9时不兼容 for in方法的情况了)
        for (var key in obj) {
            if (has(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    };


    /**
     * @description: 返回对象中所有的键值
     * @param {type} 
     * @return: 
     */
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    // 函数 Functions
    // ----------------------------------------



    // 对象 Functions
    // ----------------------------------------

    /**
     * @description: 返回predicate回调函数相反的值
     * @param predicate {Function} 
     * @return: 
     */
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    };

    // 对象 Functions
    // ----------------------------------------



    /**
     * @description: 实现浅拷贝的方法
     * @param {type} 
     * @return: 
     */
    var createAssigner = function (keysFunc, defaults) {
        return function (obj) {
            var length = arguments.length;
            if (defaults) {
                obj = Object(obj);
            };
            if (length < 2 || obj == null) {
                return obj;
            }

            for (var index = 1; index < length; index++) {
                var source = arguments[index];
                keys = keysFunc(source), l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!defaults || obj[key] === void 0) {
                        obj[key] = source[key];
                    }
                }
            }
            return obj;
        }
    };

    /**
     * @description: 浅拷贝方法调用
     * @param {type} 
     * @return: 
     */
    _.extendOwn = _.assign = createAssigner(_.keys);


    /**
     * @description: 返回 predicate[回调函数]逻辑判断中满足条件的key, 不满足则返回undefined
     * @param obj {Object || Array}     检查集合
     * @param predicate {Function}      回调函数
     * @param context {Object}          上下文对象
     * @return: 
     */
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj), key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) {
                return key;
            }
        }
    };


    /**
     * @description: 判断一个数是否为数组
     * @param {type} 
     * @return: 
     */
    _.isArray = nativeIsArray || function () {
        return toString.call(obj) === '[object Array]';
    };

    /**
     * @description: 判断是否为一个对象
     * @param obj {Object} 
     * @return: 
     */
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    // 判断是否为一个函数
    var nodelist = root.document && root.document.childNodes;
    if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
    };


    /**
     * @description: 返回自身值
     * @param {type} 
     * @return: 
     */
    _.identity = function (value) {
        return value;
    };


    /**
     * @description: 创建一个函数，当传递一个对象时，该函数将沿着给定的“路径”遍历该对象的属性，指定为键或索引数组。
     *  path的类型这里其实就只有两种： 一个 String || Array
     * @param {type} 
     * @return: 
     */
    _.property = function (path) {
        if (!_.isArray(path)) {
            return shallowProperty(path);
        }
        return function (obj) {
            return deepGet(obj, path);
        };
    }

    /**
     * @description: 两对象键名进行匹配（返回Boolean）
     *                  --> 判断一个对象是否有给定对象的key,有的返回true,没有返回false
     * @param {type} 
     * @return: 
     */
    _.isMatch = function (object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) {
            return !length;
        }
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] != obj[key] || !(key in obj)) {
                return false
            }
        }
        return true;
    }

    /**
     * @description: 两对象键名进行匹配
     * @param {type} 
     * @return: 
     */
    _.matcher = _.matches = function (attrs) {
        attrs = _.extendOwn({}, attrs);
        return function (obj) {
            return _.isMatch(obj, attrs);
        };
    };


})();