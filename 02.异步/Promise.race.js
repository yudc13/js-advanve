/**
 * Promise.race() 将多个Promise包装成一个新的Promise
 */

// 模拟一个超时的功能
const fetch = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('fetch data success')
	}, 4000)
})

const timeout = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('请求超时了')
	}, 3000)
})

const p = Promise.race([fetch, timeout])
p.then(value => {
	console.log('ok: ', value)
})
.catch(error => {
	console.log('error: ', error)
})