// then方法返回一个新的promise
// then方法返回新的promise的状态取决于then回调函数返回值的类型有关
new Promise((resolve, reject) => {
	resolve(1)
})
	.then(res => {
		return res
	})
	.then(res => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(res)
			}, 3000)
		})
	})
	.then(res => {
		return {
			then(resolve ) {
				resolve(res)
			}
		}
	}).then(res => {
		console.log(res)
})