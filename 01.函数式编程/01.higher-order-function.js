/**
 * 高阶函数-函数作为参数
 */
const array = [1, 2, 6, 8, 10, 13]
function foreach(array, fn) {
	for (let i = 0; i < array.length; i++) {
		fn(array[i])
	}
}

foreach(array, (item) => {
	console.log(item)
})

function filter(array, fn) {
	const result = []
	for (let i = 0; i < array.length; i++) {
		if (fn(array[i])) {
			result.push(array[i])
		}
	}
	return result
}

const res = filter(array, (item) => item % 2 === 0)
console.log(res)

function map(array, fn) {
	const result = []
	for (let i = 0; i < array.length; i++) {
		result.push(fn(array[i]))
	}
	return result
}

const resMap = map(array, (item) => item * 2)
console.log(resMap)

function some(array, fn) {
	let flag = false
	for (let i = 0; i < array.length; i++) {
		if (fn(array[i])) {
			flag = true
			break
		}
	}
	return flag
}

const flag = some(array, (item) => item === 18)
console.log(flag)

function every(array, fn) {
	let flag = true
	for (let i = 0; i < array.length; i++) {
		if (!fn(array[i])) {
			flag = false
			break
		}
	} 
	return flag
}

console.log(every(array, (item) => item > 1))

/**
 * 高阶函数-函数为返回值
 */
function once(fn) {
	let done = false
	return function () {
		if (!done) {
			done = true
			return fn.apply(this, arguments)
		}
	}
}
const pay = once(function (money) {
	console.log('支付了: ', money)
})

pay(12)
pay(11)
pay(14)

function memoize(fn) {
	const cache = new Map()
	const key = fn.name
	return function () {
		if (cache.has(key)) {
			return cache.get(key)
		}
		const result = fn.apply(this, arguments)
		cache.set(key, result)
		return result
	}
}

function getArea (r) {
	console.log('r: ', r)
	return Math.PI * r * r
}

const getAreaMemoize = memoize(getArea)
console.log(getAreaMemoize(4))
console.log(getAreaMemoize(4))
console.log(getAreaMemoize(4))
console.log(getAreaMemoize(4))

