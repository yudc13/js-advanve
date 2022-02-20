/**
 * Generator
 * 	遍历器对象生成函数，调用该函数返回一个遍历器对象
 * 	内部是yield定义不同的状态
 */

function * gen() {
	yield 1
	yield 2
	return 3
}

function execGen(gen) {
	const g = gen()

	function run(result) {
		if (result.done) {
			return result.value
		}
		Promise.resolve(result.value).then(res => {
			return run(g.next(res))
		})
	}

	run(g.next())
}

execGen(gen)
// 调用并不会执行该函数
// 返回的也不是函数的运行结果
// 而是返回一个指向内部状态对象的指针（遍历器对象）
// const it = gen()
//
// console.log(it.next()) // { value: 1, done: false }
//
// console.log(it.next()) // { value: 2, done: false }
//
// console.log(it.next()) // { value: 3, done: true }
//
// for (let v of it) {
// 	console.log(v) // 1 2
// }