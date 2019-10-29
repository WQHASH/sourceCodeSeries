/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2019-07-28 22:30:34
 * @LastEditTime: 2019-09-01 10:43:06
 */
let classExtends = "class的继承";
// 1.*************简介*************
// es5中的继承和es6中的比较
// ==== es5继承 ====
{
    // es5继承过程，先创建子类的**实例对象 child***, 然后借用父类的方法给实例    
    // var f = {};  //=> 先创建子类f
    // f.__porto__ = Foo.prototype; //=> 然后再将父类的方法添加到this上面（Parent.apply(this)）
    // Foo.apply(f);                //=> 这里也是将父类的方法加到实例中

    function Parent(){};
    Parent.prototype = {};
    /****
     * wq: 201904081109
     *  function Child(){
     *      Parent.call(this);
     *  };
     *  // Child.prototype = Object.create(Parent.prototype);
     *  function build(obj){
     *      var f = function(){};
     *      f.__proto__ = obj.prototype;
     *      return new f();
     *  };
     *  Child.prototype = build(Parent);
     * 
     */
    
    function build(){
        //借用Parent构造中属性
        Parent.apply(this);
    };

    function Child(){};
    // Child.prototype = Object.create(Parent.prototype);

    if(Parent.prototype){
        build.prototype = Parent.prototype; //这种暴力赋值原型方法不推荐，父类实例也可以调用子类原型
    }
    Child.prototype = new build();

    var child = new Child();
    // console.log(child instanceof Child);
    // console.log(child instanceof Parent);

    //❤配合理解4.类的 prototype 属性和__proto__属性 ❤
    //es5中构造函数__proto__指向Function对象原型，和es6中的类的区分开!!!
    // console.log(Child.__proto__ == Function.prototype);
    // console.log(Child.prototype.__proto__ == Parent.prototype)

    

    
    


}
// ==== es6继承 ====
{
    // es6继承机制： 先将父类对象的属性，加到this上面，(供 子类的 ***构造函数*** 修改this)
     class Parent {
        static staticMethod(){console.log("staticMethod-Parent")}
        point(){console.log("point")}
     };
     Object.assign(Parent.prototype, {
        say(){console.log("parent-form-say")},
        sing(){},
     });

     class Child extends Parent{
         constructor(){
             //在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
             //因为 子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
             //super它在这里表示父类的构造函数，用来新建父类的this对象。也用做调用父类方法
             super()
            //  console.log(this,"this");
            // super.point();
            this.otherAttribute = "otherAttribute";
         }
         otherMethod(){console.log("otherMethod")}

     };
    
    //  Child.staticMethod();
     let {say, otherMethod} = new Child();







    //  *********** 2.Object.getPrototypeOf() ***********
    // 类似于 child.__proto__ instanceof parent.prototype  
    // 满足这样子的可以说 child继承于parent,也可以用在es6中的类继承中 !!
    //  console.log(Object.getPrototypeOf(Child) == Parent);

}


// ****** 3.super 关键字 ******
{
   /****
    *   super关键字的使用情况：
    *      1.作为方法使用
    *           => 出现在子类的构造函数中来实现继承
    *           =>  相当于：Parent.prototype.constructor.call(Child)
    *      2.作为对象使用 
    *           => 为对象使用时super指向的就是 父类的原型对象!!
    * 
    */

    class A{
        constructor(){
            this.x = 1;
        }
        static parentMethod(){
            console.log(new this(),"childMethod"); 
        }
        print(){
            console.log(this,"AAAAA");
        }
    }

    class B extends A{
        constructor(){
            // A.prototype.constructor.call(this) => 这里的this指向B的实例对象
            super();
            this.x = 2;
            // A.prototype.print.call(this); 最为对象使用 super == A.prototype
            super.print();
        }
        static childMethod(){
            // A.parentMethod.call(B) => 这里是B类，而不再用this(B的实例),
            // =>静态方法中使用super,他指向的是父类本身,而此时父类中的this,指向当前的子类【本身】
            super.parentMethod();
        }
        print(){
            // A.prototype.print.call(this)
            // => 原型中的方法 super,他指向的是父类的原型对象，此时父类中的this,指向当前子类【实例】
            super.print();
        }
    }

    // let b = new B();
    // B.childMethod()
    // b.print()

}

// ****** 4.类的 prototype 属性和__proto__属性 ******
{   
    /**
     * Class 作为构造函数的语法糖，
     *  同时有prototype属性和__proto__属性，因此同时存在两条继承链。
     * 
     * 1.子类的__proto__属性，表示构造函数的继承，总是指向父类 (重点是类的理解)
     * 2.子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。(和es5中的一样理解)
     */

    class A{
        say(){}
    };
    class B extends A{
        constructor(){
            // A.prototype.constructor.call(this)
            super();
        }
        song(){}
    };

    let b = new B();

    //*****以下结果全为 true *********
    // console.log(b.__proto__ === B.prototype);   
    //理解1：class类语法糖的继承，区分开es5中构造__proto__ == Function.prototype的区别!
    // console.log(B.__proto__ === A); 
    //这里A之所以是能继承Function是是因为，A是基类（即不存在任何继承），而B不是它上面存在的是A
    // console.log(A.__proto__ === Function.prototype);
    //理解2：B.prototype 可以和es5中的理解一样，由于是继承B原型中的属性都是来自A原型中
    // console.log(B.prototype.__proto__ === A.prototype);  
    //A是基类，返回的是一个空对象(即Object实例)
    // console.log(A.prototype.__proto__ ===Object.prototype)  
    
}


// ****** 5.原生构造函数的继承 ******
{
    /***
     *  ES5无法继承原生构造函数
     *     As:  Object.getOwnPropertyNames(Error.call({})) 
     *              => 这中Error.call({})构造函数的出现call的第一个参数就被忽略了，无法获取父类的内部属性
     * 
     *  ES6 允许继承原生构造函数定义子类
     *      原因在于 Error.call({})原生的这种是无法获取的，
     *      但是es6中是新建父类的实例对象this，然后子类在修改父类实例this
     * 
     * 和es5中的区别： es5中是直接借用原生方法，es6中是通过借用原生的实例，间接的借用了原生
     */

    function fun (){
        this.sname = "www";
    };
    // fun.prototype = {say:function(){},"s":"ssss"};
    var obj = {};
    var newOBJ = {say:"1212",f:function(){}};

    fun.prototype.constructor.call(obj);
    // console.log(fun.prototype.constructor.call(obj))
    // console.log(Object.getOwnPropertyNames(Function))
    // console.log(Object.getOwnPropertyNames(obj))

}

// ****** 6.Mixin 模式的实现 ******
{
    /***
     * Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口
     *  As： 
     * 
     */
    const a = {
        a: 'a'
      };
      const b = {
        b: 'b'
      };
    //   const c = {...a, ...b};  //原本返回结果:{a:"a",b:"b"}, 但是现在报语法错误???

}


export {classExtends};