let useClass = "class的基本语法"; {
    let methodName = 'getMethodName';
    class Parent {
        constructor(params) {

        }
        say() {}
        // [methodName](){}

    };
    Object.assign(Parent.prototype, {
        run() {},
        song() {},
        say() {},
        // 属性表达式 
        [methodName]() {}

    });
    let parent = new Parent();
    //因为  __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性
    let parentPrototype = Object.getPrototypeOf(parent); // v生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型
    // console.log(parent,"parent");
    // console.log(parentPrototype,"parentPrototype");

    // ES6 的类，完全可以看作构造函数的另一种写法。
    // console.log(Parent === Parent.prototype.constructor);   // true
    // console.log(parent.constructor === Parent.prototype.constructor); //true


    //*****Es6类的内部所有定义的方法，都是不可枚举的[class{}中，不包含assign方法中的] es5原型中自定义方法可枚举*****
    // console.log(Object.keys(Parent.prototype), "keys");
}

// bing方法或者箭头函数留住this
{
    class Logger {
        constructor() {
            this.printName = this.printName.bind(this);
        }
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }
        print(text) {
            console.log(text);
        }
    }

    const logger = new Logger();
    const { printName } = logger;
    // printName(); //因为这里是严格模式下this指向的是 undefined =>则这里报错！
}


 //通过使用Proxy,获取方法的时候，自动绑定this
{
   
    function selfish(target) {
        const cache = new WeakMap();
        const handler = {
            get(target, key) {
                const value = Reflect.get(target, key);
                if (typeof value !== 'function') {
                    return value;
                }
                if (!cache.has(value)) {
                    cache.set(value, value.bind(target));
                }
                return cache.get(value);
            }
        };
        const proxy = new Proxy(target, handler);
        return proxy;
    };


    class Logger {
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }
        print(text) {
            console.log(text);
        }
    };

    const logger = selfish(new Logger());
    let {printName} = logger;
    // printName();

}

{

    // es5
    function Foo(){
        //私有属性，方法 => 只能在构造函数内部使用
        var a = 1;  
        var test = function(){
            console.log(this);
        };
        //共有属性
        this.sname = "wq";
    };
    //静态 属性或者方法 => 构造函数自己才能调用
    Foo.getName = function(){console.log(this)};
    //原型方法
    Foo.prototype = {
        say:function(){},
    };
    var foo = new Foo();    //构造函数静态属性不会被继承，****但Es6中可以被继承****!!!

    var f = Object.create(Foo.prototype);
    // console.log(f,"fff");



    //es6
    class FooEs6 {
        //静态属性或者方法
        static getName(){console.log(this)}
        constructor(){
            //私有属性
            var sname = "wq";
            //共有属性 => ***构造中公共属性，但都是不可枚举的***
            this.sname= "wangqi";
        }
        //原型中的属性
        otherCommonMethond(){}
        //私有方法 => 这里不像es6中直接var就区分了, ES6 不提供，只能通过变通方法模拟实现
        _privateMethod(){}


    };

    //静态属性方法
    FooEs6.prop="staticProp";  //=> 【规定】 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
    FooEs6.staticMethod = function(){console.log(this)};
    //原型中的属性
    Object.assign(FooEs6.prototype, {
        addPro:"可以添加值",
        addCommonMethond(){},
    });

    let fooEs6 = new FooEs6();
    // FooEs6.getName();    //this指向的是FooEs6方法 
                            //====>fooEs6, FooEs6Child两者去别就在于一个是实例，一个还只是类，但都继承制同一个父类
    class FooEs6Child extends FooEs6{};

    // console.log(FooEs6.prop)
    // FooEs6Child.getName();   //且这里的this指向的是 FooEs6Child该类
    

}

{
    //私有属性 的一种写法，(感觉没必要了) 或者通过 利用Symbol值的唯一性来写
    class Widget {
        foo (baz) {
          return bar.call(this, baz);
        }
      
        // ...
      }
      
      function bar(baz) {
        return this;
      }
    //   console.log(new Widget().foo())
}

{
    /*******
     * 后边涉及到：
     *      私有属性的提案 暂时没写 As: #count = 0;
     *       new.target 属性  As: =>  如果构造函数不是通过new命令调用的，new.target会返回undefined
     */
}


export {
    useClass
};