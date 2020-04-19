/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-18 11:19:47
 * @LastEditTime: 2020-04-18 11:32:57
 */
class TestClass {
    constructor(){
        console.log(this, "constructor")
        
        this.show.bind(window);
    }
    show(){
        console.log(this,"thisxx");
    }

}
