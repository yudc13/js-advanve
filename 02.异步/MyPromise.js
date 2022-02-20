
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

/**
 *
 * @param promise2 then返回的新promise
 * @param x onFulfilled的返回值
 * @param resolve
 * @param reject
 */
function resolvePromise(promise2, x, resolve, reject) {
	// 1. 如果then方法返回的新promise和onFulfilled的返回值是同一个值 直接抛出错误
	if (promise2 === x) {
		throw new TypeError('循环引用')
	}

	// 防止多次调用
	let called = false

	// 2. 如果onFulfilled的返回值是一个promise，那么then方法返回的promise的状态取决于onFulfilled的返回值是一个promise的状态
	if (x instanceof MyPromise) {
		if (x.status === PROMISE_STATUS_PENDING) {
			x.then(y => {
				resolvePromise(promise2, y, resolve, reject)
			}, reject)
		} else {
			x.then(resolve, reject)
		}
		// 3. 如果onFulfilled的返回值是一个thenable的对象或者是对象，那么需要执行这个thenable的then方法
	} else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
		// 判断是否具有then方法
		try {
			const then = x.then
			if (typeof then === 'function') {
				then.call(x, y => {
					if (called) return
					called = true
					resolvePromise(promise2, y, resolve, reject)
				}, reason => {
					if (called) return
					called = true
					reject(reason)
				})
			} else {
				resolve(x)
			}
		} catch (e) {
			if (called) return
			called = true
			reject(e)
		}
	} else {
		// 4. 普通值
		resolve(x)
	}
}

class MyPromise {
	constructor(executor) {
		// 状态
		this.status = PROMISE_STATUS_PENDING
		// 成功值
		this.value = undefined
		// 失败原因
		this.reason = undefined
		// 保存成功和失败的回调函数
		this.onFulfilledCallbacks = []
		this.onRejectedCallbacks = []
		const resolve = (value) => {
			if (this.status === PROMISE_STATUS_PENDING) {
				this.status = PROMISE_STATUS_FULFILLED
				this.value = value
				queueMicrotask(() => {
					this.onFulfilledCallbacks.forEach(onFulfilled => onFulfilled(this.value))
				})
			}
		}
		const reject = (reason) => {
			if (this.status === PROMISE_STATUS_PENDING) {
				this.status = PROMISE_STATUS_REJECTED
				this.reason = reason
				queueMicrotask(() => {
					this.onRejectedCallbacks.forEach(onRejected => onRejected(this.reason))
				})
			}
		}
		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}
	}
	then(onFulfilled, onRejected) {
		// 这里就是为了值穿透
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
		// then方法返回的新promise
		let promise2
		// 成功
		if (this.status === PROMISE_STATUS_FULFILLED) {
			return promise2 = new MyPromise((resolve, reject) => {
				queueMicrotask(() => {
					try {
						const value = onFulfilled(this.value)
						resolvePromise(promise2, value, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			})
		}
		// 失败
		if (this.status === PROMISE_STATUS_REJECTED) {
			return promise2 = new MyPromise((resolve, reject) => {
				queueMicrotask(() => {
					try {
						const reason = onRejected(this.reason)
						resolvePromise(promise2, reason, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			})
		}
		// 等待
		if (this.status === PROMISE_STATUS_PENDING) {
			return promise2 = new MyPromise((resolve, reject) => {
				this.onFulfilledCallbacks.push(() => {
					try {
						const value = onFulfilled(this.value)
						resolvePromise(promise2, value, resolve. reject)
					} catch (e) {
						reject(e)
					}
				})
				this.onRejectedCallbacks.push(() => {
					try {
						const reason = onRejected(this.reason)
						resolvePromise(promise2, reason, resolve. reject)
					} catch (e) {
						reject(e)
					}
				})
			})
		}
	}
	// 这里需要catch所有promise的错误
	catch(onRejected) {
		return this.then(undefined, onRejected)
	}
	finally(onFinally) {
		// finally也需要返回promise，不论成功还是失败都需要调用回调
		return this.then(() => onFinally(), () => onFinally())
	}
	static resolve(value) {
		return new MyPromise((resolve) => {
			resolve(value)
		})
	}
	static reject(reason) {
		return new MyPromise((resolve, reject) => {
			reject(reason)
		})
	}
	static all(promises) {
		return new MyPromise((resolve, reject) => {
			const result = []
			let count = 1
			promises.forEach((promise, index) => {
				MyPromise.resolve(promise)
					.then(value => {
						result[index] = value
						if (++count === promises.length) {
							resolve(result)
						}
					})
					.catch(err => {
						reject(err)
					})
			})
		})
	}
}

// MyPromise.all([MyPromise.resolve(1)]).then(res => {
// 	console.log('all ok: ', res)
// }).catch(err => {
// 	console.log('all err: ', err)
// })

const p = new MyPromise((resolve, reject) => {
	resolve('ok')
	// reject('oh error')
})
p.then(res => {
	// throw new Error(res)
	return MyPromise.resolve('0_0_0')
}).then(res => {
	console.log('then: ', res)
}).catch(err => {
	console.log('catch： ', err)
}).finally(() => {
	console.log('finally')
})
// p.then(value => {
// 	console.log('成功1: ', value)
// }, err => {
// 	console.log('失败1：', err)
// }).then(value => {
// 	console.log('成功2: ', value)
// }, err => {
// 	console.log('失败2：', err)
// })
//
// p.catch(err => {
// 	console.log('catch: ', err)
// })
//
// setTimeout(() => {
// 	p.then(res => {
// 		console.log('延迟执行：', res)
// 	}, err => {
// 		console.log('延迟失败: ', err)
// 	})
// }, 3000)