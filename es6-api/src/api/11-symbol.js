let symbol = "es6的第七种数据类型";


{

    /**
     * Symbol介绍：
     *  ES6 引入了一种新的原始数据类型Symbol,
     *   Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
     *   凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
     * 
     * 常见用法：
     *  1. 作为属性名的 Symbol，对象中 eg=> let obj={ [Symbol]:12}; 这里需要用数组来
     * 
     *  2. 属性名的遍历
     *          出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
     *          Object.getOwnPropertySymbols 方法可以获取指定对象的所有 Symbol 属性名。
     * 
     *  3. Symbol.for()，Symbol.keyFor() 
     *      Symbol.for，和Symbol的区别：
     *              Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。
     *              它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
     *              Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，
     *              而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
     * 
     *      Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
     * 
     * 
     * Symbol有11个内置API：
     *  hasInstance:
     *  isConcatSpreadable:
     *  
     */

    const FOO_KEY = Symbol.for('foo');
    const FOO_KEY1 = Symbol('foo');

}


export {symbol};