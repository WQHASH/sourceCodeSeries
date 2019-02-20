let useClass = "class的基本语法"; 
{
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
    printName(); //因为这里是严格模式下this指向的是 undefined =>则这里报错！
}



{
// 1.Generator 方法？
// 2.Proxy 代理？
  
}

export {
    useClass
};