// 纯函数
// 相同的输入总是得到相同的输出
// 函数内不能有副作用（不能修改外部变量，参数，事件监听...）

const arr = [1,2,3,4,5]
// 这里的slice就是一个纯函数
const newArr = arr.slice(0, 3)

// 会修改原数组(有副作用) 不是纯函数
const newArr2 = arr.splice(0, 3)
console.log(newArr2)