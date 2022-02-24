/**
 * CommonJs
 * 	- 每个文件就是一个模块，有自己的作用域，再这个文件定义的函数 变量都是私有的，对其他文件不可见
 */

const testCache = require('./test-cache')

// 再次加载 此时是从缓存获取的
// require('./test-cache')

console.log('testCache: ', testCache)

const testExports = require('./exports')
console.log(testExports, testExports.test)

/**
 * 我是b:  a1
 * 我是a:  b2
 * main a  a2
 * main b  b2
 */
console.log('main a ', require('./a').x)
console.log('main b ', require('./b').x)

const info = require('./test-ref')

console.log(info)
setTimeout(() => {
	console.log('修改后的值: ', info)
}, 2000)