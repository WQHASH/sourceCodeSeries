let usePromise = "Promise";
/**
 * 什么是promise:
 * 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
 * 
 * promise有什么用：
 * 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
 * 此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
 * 
 * promise执行的特点：
 *  1. Promise 新建后就会立即执行; 
 *          => as:  new Promsie() 它也是这函数
 *  2. then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
 *     *如果遇到链式调用的then 后者的then就会等待前者Promise对象的状态发生变化，才会被调用 
 *          => as:  因为这里的操作时异步处理后的结果所以需要等到最后执行
 * 
 */

let state = 1;
let login = (res, rej) => {
    setTimeout(() => {
        if (state == 1) {
            res({ "data": "登录-成功" })
        } else {
            rej({ "data": "登录-失败" })
        }
    }, 1000);
};

let getUserInfo = (res, rej) => {
    setTimeout(() => {
        if (state == 1) {
            res({ "data": "获取信息-成功" })
        } else {
            rej({ "data": "获取信息-失败" })
        }
    })
}
/**
 *  这里Promise相当于一个异步容器;
 *  then分别处理了成功和失败的回调后对数据的操作,这样在书写形式上避免层层嵌套，
 *  then的回调函数分别接收的也正是 Promise容器中 resolved,rejected函数传递的参数调用
 * 
 */
new Promise(login).then((val) => {
    // console.log(val, "res");
    return new Promise(getUserInfo)
}).then((val) => {
    // console.log(val)
}).catch((err) => { console.log(err, "1") })



/***
 * 
 * 关于 Promsie 和 axios的封装
 * 
 */
{

    // util工具
    // import axios from "axios";
    // function axios(url, data={}, method='get'){
    //     return new Promise((resolved, rejected)=>{
    //         axios({
    //             url: url,
    //             method: method,
    //             headers:{
    //                 'Content-Type': 'application/json'
    //             },
    //             data: data
    //         }).then((res)=>{
    //             resolved(res);
    //         }).catch((rej)=>{
    //             rejected(rej);
    //         })
    //     })
    // };
    // export {axios};

    // 封装server
    // import axios from "util";
    // let server = {
    //     getUserInfo(){
    //         let userinfo={};
    //         axios 返回的是一个promise对象
    //         return axios("http://192.168.14.115/api/userinfo", {}, "post");    
    //     }
    // }
    // export {server}

    // 组件使用
    // import server from "server";
    // 这样封装后调用的形式更加想同步化了
    // server.getUserInfo().then().catch()


}
export { usePromise }