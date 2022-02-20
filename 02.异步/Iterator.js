function makeIterator(array) {
	return {
		[Symbol.iterator]() {
			let index = 0
			return {
				next() {
					return {
						value: array[index++],
						done: index > array.length
					}
				},
				return() {
					console.log('return')
					return { done: true } // 必须返回一个对象
				}
			}
		}
	}
}
const it = makeIterator([1, 2])

// console.log(it.next()) // { value: 1, done: false }
//
// console.log(it.next()) // { value: 2, done: false }
//
// console.log(it.next()) // { value: undefined, done: true }

for (let val of it) {
	console.log('val: ', val)
	// 出错或者break会执行return方法
	if (val === 1) {
		break
	}
}