/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-09-02 10:37:57
 * @LastEditTime: 2020-09-02 12:58:56
 */
const isFunction = variable => typeof variable !== 'function';

// promise 三种状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class tempPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('参数错误');
        }
        // promise 状态 和 值信息
        this._status = PENDING;
        this._value = undefined;
        // 用来存储 promsie回调队列
        this._fulfilledQueues = [];
        this._rejectedQueues = [];

        try {
            handle(this._resolve.bind(this), this._resolve.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }

    /**
     * @description: 主要用来设置status 和value
     * @param {type} 
     * @return {type} 
     */
    _resolve(val) {
        let run = () => {
            let { _status, _value } = this;
            if (_status !== PENDING) { return `状态已定型: ${_status}` };
            this._status = FULFILLED;
            // 执行回调队列
            let runFulfilled = (value) => {
                let cd;
                while (cd = this._fulfilledQueues.shift()) {
                    cd(value);
                }
            };
            let runRejected = (error) => {
                let cd;
                while (cd = this._rejectedQueues.shift()) {
                    cd(value);
                }
            };

            if (val in tempPromise) {
                val.then((data) => {
                    this._value = data;
                    runFulfilled(val);
                }, (err) => {
                    this._value = err;
                    runRejected(err);
                });
            } else {
                runFulfilled(val);
            }
        };
        setTimeout(run, 0);
    }

    _reject(val) {
        let run = () => {
            let { _status } = this;
            if (_status !== PENDING) { return `状态已定型: ${_status}` };
            this._status = REJECTED;
            let cd;
            while (cd = this._rejectedQueues.shift()) {
                cd(val);
            }
        };

        setTimeout(run, 0);
    }

    then(onFulfilled, onRejected) {
        let { _status, _value } = this;

        return new tempPromise((onFulfilledNext, onRejectedNext) => {
            let resolve = (val) => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(val);
                    } else {
                        let result = onFulfilled(val);
                        if (result in tempPromise) {
                            result.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(result);
                        }
                    }
                } catch (error) {
                    onFulfilledNext(error);
                }


            };

            let rejectd = (err) => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(err);
                    } else {
                        let result = onRejected(err);
                        if (result in tempPromise) {
                            result.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(result);
                        }
                    }
                } catch (error) {
                    onFulfilledNext(error);
                }
            };

            switch (_status) {
                case PENDING:
                    this._fulfilledQueues.push(resolve);
                    this._rejectedQueues.push(rejectd);
                    break;
                case FULFILLED:
                    resolve(_value);
                    break;
                case REJECTED:
                    rejectd(_value);
                    break;
                default:
                    break;
            }
        });
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    finally(callBack) {
        return this.then(
            data => tempPromise.resolve(cb()).then(() => { return data }),
            err => tempPromise.resolve(cb()).then(() => { return err })
        )
    }

    all() { }
    race() { }

    static resolve() { }
    static reject() { }

}



