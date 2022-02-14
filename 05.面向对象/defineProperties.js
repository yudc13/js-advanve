const obj = { _address: '' }

// 定义一个
Object.defineProperty(obj, 'name', {
	value: 'jack', // 默认undefined
	// 下面三个属性如果不写默认为false
	configurable: true,
	writable: true,
	enumerable: true
})

// 定义多个属性
Object.defineProperties(obj, {
	age: {
		value: 20,
		configurable: true,
		writable: true,
		enumerable: true
	},
	address: {
		configurable: true,
		enumerable: true,
		get () {
			return this._address
		},
		set (value) {
			this._address = value
		}
	}
})

console.log(obj)

// 对象限制
const person = {
	name: 'jack',
	age: 24
}

// 阻止新增属性 但是可以修改原有的属性和使用delete删除
// Object.preventExtensions(person)
// 不可配置（不能使用delete删除原有属性），不能新增，可以修改
// Object.seal(person)
// 新增，删除，修改都不可以
Object.freeze(person)
person.age = 10
delete person.age
person.email = '123@qq.com'
console.log(person)