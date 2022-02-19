/**
 * Promise.any() 有一个成功最终的状态就是成功，所有的失败最终的状态才是失败
 */

Promise.any([Promise.reject(1), Promise.reject(2), Promise.reject(2)])
.then(value => {
	console.log('value: ', value)
})
.catch(error => {
	console.log('error: ', error) // error:  [AggregateError: All promises were rejected]

})

Promise.any([Promise.reject(1), Promise.resolve(2), Promise.reject(2)])
	.then(value => {
		console.log('value: ', value) // value2 先输出
	})
	.catch(error => {
		console.log('error: ', error)

	})