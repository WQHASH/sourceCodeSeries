let usePromise = "Promise";

let state = 1;
let login = (res, rej)=>{
    setTimeout(()=>{
        if(state==1){
            res({"data":"登录-成功"})
        }else{
            rej({"data":"登录-失败"})
        }
    },1000);
};

let getUserInfo = (res, rej)=>{
    setTimeout(()=>{
        if(state==1){
            res({"data":"获取信息-成功"})
        }else{
            rej({"data":"获取信息-失败"})
        }
    })
}

new Promise(login).then((res, rej)=>{
    console.log(res,"res");
    return new Promise(getUserInfo)
},(err)=>{console.log(err,"1")}).then((res, rej)=>{
    console.log(res)
})


export {usePromise}