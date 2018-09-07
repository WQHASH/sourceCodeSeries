
export class ArrayFn {
    /** 
     * [contains 判断一个元素是否在数组中]
     * @author wq
     * @DateTime 2018-09-06T14:18:02+0800
     * @param    {[Array]}                 arr [数组]
     * @param    {[Number]}                 val [判断的目标元素]
     * @return   {[Boolean]}                     [返回一个boolean值]
     */
    contains(arr, val){
        return arr.indexOf(val) !=-1?true:false;
    };

    /** 
     * [each 遍历数组]
     * @author wq
     * @DateTime 2018-09-06T14:18:02+0800
     * @param    {[Array]}                 arr [数组]
     * @param    {[Function]}                 fn [回调函数]
     */
    each (arr, fn) {
        fn = fn || Function;
        var a = [];
        var args = Array.prototype.slice.call(arguments, 1);
        // fn()
        for(var i = 0; i < arr.length; i++) {
            //这里体现es6 的rest 的 扩展运算符 和 Rest参数的用法
            //扩展运算符：  扩展操作符是把数组扩展成单独的参数。 代替了apply => Math.max(...[2,3,4])
            //Rest参数： rest参数是把所有的参数收集起来转换成数组。  myFunction(2,3,4); 该函数返回时 这里的参数会是一个数组形式 
            // fn(...[arr[i], i].concat(args))
            fn(arr[i], i, ...args)
            

            // fn.apply(this, [arr[i], i].concat(args))
            // var res = fn.apply(arr, [arr[i], i].concat(args));
            // if(res != null) {
            //     console.log("red");
            //     return a.push(res)
            // };
        }
    };

    map (arr, fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for(var i = 0, j = arr.length; i < j; ++i) {
            // 这里返回的 fn函数运行返回的结果，也体现map方法return的意义!
            var res = fn.call(scope, arr[i], i, this);
            if(res != null) a.push(res);
        }
        return a;
    };

    sort(arr, type = 1){
        return arr.sort((a, b)=>{
            switch (type) {
                case 1:
                    return a - b;
                    break;
                case 2:    
                    return b - a;
                case 3:
                // https://blog.csdn.net/jiang_zzz/article/details/53786999
                // 这里涉及洗牌算法，可以详细参考  (下面的随机排序可能存在错误)
                    return Math.random() - 0.5;
                default:
                    return arr 
                    // statements_def
                    break;
            }

        })
    };

    /*去重*/
    unique (arr) {
        if ( Array.hasOwnProperty('from') ) {
            //ES6为Array增加了from函数用来将其他对象转换成数组。  
            //其他对象: 1.部署了Iterator接口的对象，比如：Set（es6去重），Map，Array。 2.类数组对象
            return Array.from(new Set(arr));
        }else{
            var n = {},r=[]; 
            for(var i = 0; i < arr.length; i++){
                if (!n[arr[i]]){
                    n[arr[i]] = true;  
                    r.push(arr[i]);
                }
            }
            return r;
        }
        // 注：上面 else 里面的排重并不能区分 2 和 '2'，但能减少用indexOf带来的性能
         // 正确排重
        // if ( Array.hasOwnProperty('from') ) {
        //     return Array.from(new Set(arr))
        // }else{
        //     var r = [], NaNBol = true
        //     for(var i=0; i < arr.length; i++) {
        //         if (arr[i] !== arr[i]) {
        //             if (NaNBol && r.indexOf(arr[i]) === -1) {
        //                 r.push(arr[i])
        //                 NaNBol = false
        //             }
        //         }else{
        //             if(r.indexOf(arr[i]) === -1) r.push(arr[i])
        //         }
        //     }
        //     return r
        // }        
    };

    /*求两个集合的并集*/
    union(a, b){
        let newArr = a.concat(b);
        return this.unique(newArr);
    };

    /*求两个集合的交集*/
    intersect(a, b){ 
        let self = this;
        a = this.unique(a);
        return this.map(a, (o)=>{
            return self.contains(b, o)? o: null;
        })
    };

    
    ///*将类数组转换为数组的方法*/  => slice剖析：https://segmentfault.com/q/1010000006903928
    formArray(ary){
        var arr = [];
        if(Array.isArray(ary)){
            arr = ary;
        }else{
            arr = Array.prototype.slice.call(ary);
        }
        return arr;
    };

    /*最大值*/
    max(arr){
        return Math.max.apply(this, arr);
    };

    /*最小值*/
    min(arr){
        return Math.min.apply(this, arr);
    };

    /*求和*/
    sum(arr){
        return arr.reduce((pre, cur)=>{
            return pre + cur
        },0)
    };

    /*求差*/
    subtraction(arr){
        return arr.reduce((pre, cur)=>{
            return pre - cur
        })
    };

    /*平均值*/
    average(arr){
        return this.sum(arr)/arr.length;
    };
    
    
};


/**
 * 这里说明 es6 中的class本质上也就是一个 function类型，所以他内部不能用逗号，分号是可以的
 */
// console.log(typeof ArrayFn,"type");
// console.log(ArrayFn.prototype.toString,"ArrayFn");
/**
 *   es6中数组的一些方法:
 *       reduce: reduce函数可以理解成一个迭代函数
 *           array.reduce((pre, cur, index, array)=>{}, [initValue])
 *           previous值取决于[initialValue], 如果指定[initialValue]指定是，则作为previous的初始值，也可作为空数组[]，
 * 
 */


