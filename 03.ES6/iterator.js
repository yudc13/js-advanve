const obj = {
	store: ['jack', 'tom'],
	[Symbol.iterator]: function () {
		let index = 0
		const self = this
		return {
			next: function () {
				return {
					value: self.store[index++],
					done: index > self.store.length
				}
			}
		}
	}
}

// for (let key in obj) {
// 	console.log(key)
// }

for (let value of obj) {
	console.log(value)
}