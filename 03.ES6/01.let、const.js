const a = 1
// a = 3 // error 不允许重新赋值
const obj = { name: 'jack' }
obj.name = 'tom' // ok 只要obj的引用不变就可以

// let const 不允许重复声明
var age = 10
// let age = 10 // error

console.log(age)