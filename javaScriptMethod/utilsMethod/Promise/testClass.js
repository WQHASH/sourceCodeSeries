/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-04-18 11:19:47
 * @LastEditTime: 2020-04-26 10:32:18
 */

let isFunction = (variable) => {
    return typeof variable === 'function';
};

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


class newPromise {
    _status = PENDING;
    _value = undefined;
    // 成功的回调函数队列
    _fulfilledQueues = [];
    // 失败的回调函数队列
    _rejectedQueues = [];

    constructor(callBack) {
        if (!isFunction(callBack)) {
            throw new Error("请传递一个函数");
        }
        try {
            callBack(this._resove.bind(this), this._reject.bind(this));
        } catch (e) {
            this._reject(err);
        }
    }

    _resove(val) {
        const run = () => {
            // 在这里状态还应该是进行中的 
            if (this._status !== PENDING) {
                return;
            }
            this._status = FULFILLED;

            const runFulfilled = (value) => {
                let cb = this._fulfilledQueues.shift();
                while (cb) {
                    cb(value);
                }
            }

            const runRejected = (err) => {
                let cb = this._rejectedQueues.shift();
                while (cb) {
                    cb(err);
                }
            }

            if (val instanceof newPromise) {
                val.then((value) => {
                    this._value = value;
                    runFulfilled(value);
                }, (err) => {
                    this._value = err;
                    runRejected(err);
                });
            } else {
                this._value = val;
                runFulfilled(val);
            }
        }

        setTimeout(run, 0);
    }

    _reject(err) {
        if (this._status !== PENDING) {
            return;
        }
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let cb = this._rejectedQueues.shift();
            while (cb) {
                cb(err);
            }
        }
        setTimeout(run, 0);
    }

    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        return new newPromise((onFulfilledNext, onRejectedNext) => {
            let fulfilled = (value) => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value);
                    } else {
                        let res = onFulfilled(value);
                        // 如果 then 成功回调执行完后，返回的还是 promsie对象
                        if (res instanceof newPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }

                    }
                } catch (err) {
                    onRejectedNext(err);
                }
            }

            let rejected = (err) => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(err);
                    } else {
                        let res = onRejected(err);
                        if (res instanceof newPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }
                    }
                } catch (e) {
                    onRejectedNext(e);
                }
            }

            switch (_status) {
                // 状态为 pending时, 将then方法回调函数加入到队列中
                case PENDING:
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        });
    }

    catch(onRejectedCallBack) {
        return this.then(undefined, onRejectedCallBack);
    }

    finally(callBack) {
        return this.then((value) => {
            return newPromise.resolve(callBack()).then(() => {
                return value;
            });
        }, (err) => {
            return newPromise.reject(callBack()).then(() => {
                throw err;
            });
        });
    }

    static resolve(value) {
        if (value instanceof newPromise) {
            return value
        }
        return new newPromise((resolve) => { return resolve(value) });
    }
    static reject(value) {
        return new newPromise((resolve, reject) => { return reject(value) });
    }
    static all(arrList) { }
    static race(arrList) { }

}