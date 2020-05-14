/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-06 08:58:28
 * @LastEditTime: 2020-05-14 15:48:11
 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
let isFunction = (val) => { return typeof val === "function" };
class testPromise {
    constructor(executor) {
        if (isFunction(executor)) {
            throw new Error("请输入一个函数!");
        }
        this._value = undefined;
        this._status = PENDING;
        this._fulfilledQueues = [];
        this._rejectedQueues = [];
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }

    _resolve(value) {
        let run = () => {
            if (this._status !== PENDING) { return };
            this._value = FULFILLED;
            let runFulfilled = (val) => {
                let runFun;
                while (runFun = this._fulfilledQueues.shift()) {
                    runFun(val);
                }
            };
            let runRejected = (err) => {
                let runFun;
                while (runFun = this._rejectedQueues.shift()) {
                    runFun(err);
                }
            };

            if (value instanceof testPromise) {
                value.then((data) => {
                    this._value = data;
                    runFulfilled(data);
                }, (err) => {
                    this._value = err;
                    runRejected(err);
                });
            } else {
                this._value = value;
                runFulfilled(value);
            }
        };
        setTimeout(run, 0);
    }

    _reject(err) {
        let run = () => {
            if (this._status !== PENDING) { return };
            this._value = REJECTED;
            let runFun;
            while (runFun = this._rejectedQueues.shift()) {
                runFun(err);
            }

        };
        setTimeout(run, 0);
    }

    then(onResolve, onReject) {
        let { _status, _value } = this;
        return new Promise((onResolveNext, onRejectNext) => {
            let fulfilled = (value) => {
                try {
                    if (!isFunction(onResolve)) {
                        onResolveNext(value);
                    } else {
                        let result = onResolve(value);
                        if (result instanceof testPromise) {
                            result.then(onResolveNext, onRejectNext);
                        } else {
                            onResolveNext(result);
                        }
                    }
                } catch (e) {
                    onRejectNext(e);
                }
            };
            let rejected = (error) => {
                try {
                    if (!isFunction(onReject)) {
                        onRejectNext(value);
                    } else {
                        let result = onReject(error);
                        if (result instanceof testPromise) {
                            result.then(onResolveNext, onRejectNext);
                        } else {
                            onResolveNext(result);
                        }
                    }
                } catch (e) {
                    onRejectNext(e);
                }
            };
            switch (_status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(_value);
                    break;
                default:
                    rejected(_value);
                    break;
            }
        });
    }

    catch() { }
    finally() { }

    static resolve() { }
    static reject() { }
    static all() { }
    static race() { }


};


let testpromise = new testPromise((resolve, reject) => {
    resolve(12);
});
testpromise.then((data) => { }).catch((err) => { });
