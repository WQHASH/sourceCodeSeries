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
    
    function build(){};

    function Child(){};
    // Child.prototype = Object.create(Parent.prototype);

    if(Parent.prototype){
        build.prototype = Parent.prototype;
    }
    Child.prototype = new build();

    var child = new Child();
    // console.log(child instanceof Child);
    // console.log(child instanceof Parent);


    

    
    


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
             console.log(this,"this");
            // super.point();
            this.otherAttribute = "otherAttribute";
         }
         otherMethod(){console.log("otherMethod")}

     };
    
    //  Child.staticMethod();
     let {say, otherMethod} = new Child();







    //  Object.getPrototypeOf()
    // 类似于 child.__proto__ instanceof parent.prototype  
    // 满足这样子的可以说 child继承于parent,也可以用在es6中的类继承中 !!
     console.log(Object.getPrototypeOf(Child) == Parent);

}


// ****** super 关键字 ******
{
   
}

export {classExtends};