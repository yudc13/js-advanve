const set = new Set([1,2,3])
// 添加元素
set.add(4).add(4).add(5) // 添加重复的会被忽略
console.log(set.has(1))
console.log(set.size)
console.log(set.delete(1))
// set.clear()
console.log('--------')
// 遍历
for (let key of set.keys()) { // Set的键值是同一个
	console.log(key)
}
for (let value of set.values()) {
	console.log(value)
}

for (let [key, value] of set.entries()) {
	console.log(key, value)
}
set.forEach((value, key) => {
	console.log(value, key)
})
console.log(set)

// 使用Array.from将Set转为数组
const arr = Array.from(set)
console.log(arr)

let obj = { name: 'jack' }
const weakSet = new WeakSet()
weakSet.add(obj)
console.log(weakSet)


console.log('-------Map-----')
//Map可以使用对象作为key
const map = new Map()
map.set(obj, '123')
map.set(obj, '456') // 覆盖前者
console.log(map)
console.log(map.get(obj))
console.log(map.size)
console.log(map.delete(obj))
map.clear()