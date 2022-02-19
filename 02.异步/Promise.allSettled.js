/**
 * Promise.allSettled() 会等到所有的Promise都返回结果（不管是成功还是失败）
 * 返回的Promise状态总是fulfilled
 */

Promise.allSettled([Promise.resolve(1), Promise.reject(-1)])
.then(value => {
	console.log(value)
})