/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-06 08:58:28
 * @LastEditTime: 2020-05-14 16:19:51
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

    static resolve() { }
    static reject() { }


};
