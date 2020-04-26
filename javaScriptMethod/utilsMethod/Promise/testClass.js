/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-18 11:19:47
 * @LastEditTime: 2020-04-25 19:14:23
 */
class TestClass {
    _count = 0;
    static myStaticProp = 42;
    constructor(){
        console.log(TestClass.myStaticProp);
        console.log(this, "constructor")
        // this.show.bind(window);
    }
    show(){
        console.log(this,"thisxx");
    }

}
