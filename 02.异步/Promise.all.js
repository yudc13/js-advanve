const p1 = new Promise((resolve, reject) => {
	resolve('p1 ok')
})
	.then(value => `p1 then: ${value}`)
	.catch(error => `p1 error: ${error}`)

const p2 = new Promise((resolve, reject) => {
	throw new Error('p2 出错了')
})
	.then(value => `p2 then: ${value}`)
	.catch(error => new Error(`p2 error: ${error}`)) // 即使返回的是一个错误的对象 返回的新Promise的状态也是resolved

// 如果Promise.all中的promise有自己的catch，那么如果出错了
// 不会调用p的catch
const p = Promise.all([p1, p2])
p.then(values => {
	console.log('p values: ', values)
}).catch(error => {
	console.log('p error: ', error)
})