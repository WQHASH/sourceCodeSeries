/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-06 08:58:28
 * @LastEditTime: 2020-05-15 12:55:51
 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
let isFunction = (val) => { return typeof val === "function" };
class testPromise {
    constructor(executor) {
        if (!isFunction(executor)) { throw new Error("请输入一个函数!") };
        this._status = PENDING;
        this._value = "";
        this._fulfilledQueue = [];
        this._rejectedQueue = [];
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }

    }

    _resolve(data) {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        const run = () => {
            // 执行 then存储的_fulfilledQueue队列
            let runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueue.shift()) {
                    cb(value);
                }
            };
            let runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueue.shift()) {
                    cb(value);
                }
            };

            if (data instanceof testPromise) {
                data.then((val) => {
                    this._value = val;
                    runFulfilled(val)
                }, (err) => {
                    this._value = err;
                    runRejected(err);
                })
            } else {
                this._value = data;
                runFulfilled(data);
            }

        }

        setTimeout(run, 0);
    }

    _reject(err) {
        if (this._status !== PENDING) return;
        // 执行 then存储的_rejectedQueue队列
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let cb;
            while (cb = this._rejectedQueue.shift()) {
                cb(value);
            }
        }
        setTimeout(run, 0);
    }

    then(onResolve, onReject) {
        const { _status, _value } = this;
        return new testPromise((onResolveNext, onRejectNext) => {
            let resolvedCallBack = (value) => {
                try {
                    if (!isFunction(onResolve)) {
                        onResolveNext(value);
                    } else {
                        let res = onResolve(value);
                        if (res instanceof testPromise) {
                            res.then(onResolveNext, onRejectNext);
                        } else {
                            onResolveNext(res);
                        }
                    }
                } catch (error) {
                    onRejectNext(error);
                }

            }

            let rejectedCallBack = (err) => {
                try {
                    if (!isFunction(onReject)) {
                        onRejectNext(err);
                    } else {
                        let res = onReject(err);
                        if (res instanceof testPromise) {
                            res.then(onResolveNext, onRejectNext);
                        } else {
                            // 这里用成功回调是因为, res的结果这里可以排除错误的情况，以及Promsie实例
                            // 那么剩下来的就是 resolve的处理方式
                            onResolveNext(res);
                        }
                    }
                } catch (error) {
                    onRejectNext(error);
                }
            }
            switch (_status) {
                case PENDING:
                    this._fulfilledQueue.push(resolvedCallBack);
                    this._rejectedQueue.push(rejectedCallBack);
                    break;
                case FULFILLED:
                    resolvedCallBack(_value);
                    break;
                case REJECTED:
                    rejectedCallBack(_value);
                    break;
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    fillnay(callBack) {
        return this.then(
            value => testPromise.resolve(callBack()).then(() => value),
            error => testPromise.reject(callBack()).then(() => { error })
        )
    }

    // 等待所有返回再执行
    all(list) {
        return new testPromise((resolve, reject) => {
            let values = [];
            let count = 0;
            for (let [i, val] of list.entrys()) {
                this.resolve(val).then((data) => {
                    values[i] = data;
                    count++;
                    if (count == list.length) {
                        resolve(values);
                    }
                }, (error) => {
                    resolve(error);
                })
            }
        });
    }

    // 竞态关系,执行最先返回的一个
    race(list) {
        return new testPromise((resolve, reject) => {
            for (let [i, val] of list.entrys()) {
                this.resolve((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                })
            }
        });
    }

    // ** 提案
    // 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态;
    // 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
    any() { }

    // ** ES2020 引入。
    //只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
    allSettled() {
        return new testPromise((resolve, reject) => {
            let values = [];
            let count = 0;
            for (let [i, val] of list.entrys()) {
                this.resolve(val).then((data) => {
                    values[i] = data;
                    count++;
                    if (count == list.length) {
                        resolve(values);
                    }
                }, (error) => {
                    values[i] = error;
                    count++;
                    if (count == list.length) {
                        reject(values);
                    }
                })
            }
        });
    }

    static resolve(value) {
        if (value instanceof testPromise) { return value };
        return new testPromise(resolve => resolve(value));
    }
    static reject(error) {
        return new testPromise((resolve, reject) => reject(error));
    }

};
