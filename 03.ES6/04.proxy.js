const obj = {
	name: 'jack',
	age: 18,
	// [Symbol()]: 'symbol'
}

// Object.keys 获取对象自身可枚举的属性（不包含继承的属性和Symbol）
Object.keys(obj).forEach(key => {
	let value = obj[key]
	// 不能监听属性的新增和删除
	Object.defineProperty(obj, key, {
		get() {
			console.log(`监听到${key}属性的访问`)
			return value
		},
		set(v) {
			console.log(`监听到${key}属性被设置`)
			value = v
		}
	})
})

obj.name = 'tom'
obj.age = 19



const proxyObj = new Proxy(obj, {
	get(target, key, receiver) {
		console.log(`触发了get, key=${key}`, target, receiver)
		return Reflect.get(target, key, receiver)
	},
	set(target, key, value, receiver) {
		console.log(`触发了set, key=${key}, value=${value}`)
		return Reflect.set(target, key, value, receiver)
	},
	has(target, key) {
		console.log('监听对象的in操作')
		return key in target
	}
})

console.log(proxyObj.name)

console.log('name' in proxyObj)
