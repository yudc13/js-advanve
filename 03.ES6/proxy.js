const obj = new Proxy({}, {
	get(target, key, receiver) {
		console.log(`触发了get, key=${key}`)
		return Reflect.get(target, key, receiver)
	},
	set(target, key, value, receiver) {
		console.log(`触发了set, key=${key}, value=${value}`)
		return Reflect.set(target, key, value, receiver)
	}
})

obj.count = 0
++obj.count