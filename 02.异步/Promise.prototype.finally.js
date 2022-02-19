const p = Promise.resolve('error')

p.then(res => {})
.finally(() => {
	console.log('finally')
})