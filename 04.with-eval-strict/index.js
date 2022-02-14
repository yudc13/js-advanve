// with语句 可以形成自己的作用域

const obj = { name: 'kobe' }
const name2 = 'jack'
with (obj) {
	// 首先会从obj中去查找 没有再从父级作用域查找
	console.log(name2) // jack
}
// var let = 123
// eval的代码需要经过js解释器，不被js引擎优化
const jsStr = 'var msg = 123; console.log(msg)'
eval(jsStr) // jack
console.log(msg) // 非严格模式 可以输出eval中的123 严格模式报错

// strict 严格模式
/**
 * 限制：
 * 1. 意外创建全局变量
 * 2. 函数参数不允许有相同的参数名
 * 3. 不允许0开头的八进制（可以使用0o）
 * 4. 不允许使用with
 * 5. eval不会向上引用变量
 * 6. 默认绑定this指向undefined
 * 7. setTimeout中的this指向window(非箭头函数)
 */



// "use strict"
// msg = 'jack' // 报错 不被允许