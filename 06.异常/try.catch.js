function foo() {
	throw new Error('出错了')
}

try {
	foo()
} catch (e) {
	console.log('error: ', e)
} finally {
	console.log('有无异常finally都会执行')
}

console.log('end~~~~')