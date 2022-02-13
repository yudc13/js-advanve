const obj = {
	[Symbol()]: 1
}

Object.defineProperty(obj, 'name', {
	value: 'jack',
	enumerable: false
})

console.log(Reflect.ownKeys(obj))