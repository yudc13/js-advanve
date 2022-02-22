console.log('begin')

setTimeout(() => {
	console.log('setTimeout')
	queueMicrotask(() => {
		console.log('queueMicrotask2')
	})
}, 1000)
setTimeout(() => {
	console.log('setTimeout2')
}, 1000)

queueMicrotask(() => {
	console.log('queueMicrotask')
})

Promise.resolve().then(res => {
	console.log('then')
})

console.log('end')

async function bar() {
	console.log('1111')
	// return 的值会被包装成promise
	return '222'
}

console.log(bar())



Promise.resolve().then(() => {
	console.log(0)
	// return 普通值 不推迟
	// return thenable 会推迟一次
	// return Promise 会推迟两次微任务
	return Promise.resolve(4)
}).then((res) => {
	console.log(res)
})

Promise.resolve().then(() => {
	console.log(1)
}).then(() => {
	console.log(2)
}).then(() => {
	console.log(3)
}).then(() => {
	console.log(5)
}).then(() => {
	console.log(6)
})
