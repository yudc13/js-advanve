async function foo () {
	console.log('async')
	// 异步函数内部抛出的异常会作为promise的reject的值
	throw new Error('出错了')
	// 这里return的值和promise resolve实现类似
	// return 'foo'
	// return {
	// 	then(resolve) {
	// 		resolve('thenable')
	// 	}
	// }
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('promise')
		}, 2000)
	})
}

// console.log('begin')
// foo().then(res => {  // 返回一个promise
// 	console.log('res: ', res)
// }).catch(err => {
// 	console.log('err: ', err.message)
// })
// console.log('end')


async function bar () {
	console.log('abc')
	await console.log(123)
	console.log('def')
}
bar().catch(err => {
	console.log(err)
})
console.log(456)