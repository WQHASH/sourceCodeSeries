(function () {
    var root = this;
    var previousUnderscore = root;
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var 
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var
        nativeIsArray = Array.isArray
    nativeKeys = Object.keys, // Object.keys()方法会返回( 引用类型的键名 )一个所有元素为字符串的数组
    nativeBind = FuncProto.bind,
    nativeCreate = Object.create;

    var _ = function (obj) {
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

    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) {
            return func;
        }
        switch (argCount == null ? 3 : argCount) {
            case 3: return function (value, index, list) {
                return func.call(context, value, index, list);
            };
        };

        //体现代码的健壮性
        return function () {
            return func.apply(context, arguments);
        };
    };

    var cd = function (value, context, argCount) {
        if (value == null) {
            return _.identity;
        };
        if (_.isFunction(value)) {
            return optimizeCb(value, context, argCount);
        };
        if (_.isObject(value)) {
            return _.matcher(value);
        }

        
    };




    /**
    *  判断是不是一个函数
    *   /./ =>类型是一个对象
    *   Int8Array =>类型是一个函数
    *   [不知道这么些的好处???] 
    */

    if (typeof /./ != "function" && typeof Int8Array != "object") {
        _.isFunction = function (obj) {
            return typeof obj == "function" || false;
        };
    };

    _.isObject = function (obj) {
        var type = typeof obj;
        return type === "function" || type === "object" && !!obj;

    };

    _.identity = function (value) {
        return value
    };



    




}.call(this));



(function () { }).call(this);

(function () { })("arg");

