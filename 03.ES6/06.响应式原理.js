let activeReactiveFn = null

class Depend {
	constructor() {
		this.deps = new Set()
	}
	add(fn) {
		this.deps.add(fn)
	}
	depend() {
		if (activeReactiveFn) {
			this.deps.add(activeReactiveFn)
		}
	}
	notify() {
		this.deps.forEach(fn => fn())
	}
}

const targetMap = new WeakMap()
function getDepend(target, key) {
	let depMap = targetMap.get(target)
	if (!depMap) {
		depMap = new Map()
		depMap.set(key, new Depend())
		targetMap.set(target, depMap)
	}
	if (!depMap.get(key)) {
		depMap.set(key, new Depend())
	}
	return depMap.get(key)
}

function watchFn(fn) {
	activeReactiveFn = fn
	fn()
	activeReactiveFn = null
}

const obj = {
	name: 'jack',
	age: 18
}

const info = {
	address: '北京'
}

const objProxy = new Proxy(obj, {
	get(target, key, receiver) {
		const dep = getDepend(target, key)
		dep.depend()
		return Reflect.get(target, key, receiver)
	},
	set(target, key, value, receiver) {
		Reflect.set(target, key, value, receiver)
		const dep = getDepend(target, key)
		dep.notify()
	}
})

watchFn(function () {
	console.log('我是第一个函数')
	console.log('my name is ', objProxy.name)
})

watchFn(function () {
	console.log('我是第二个函数')
	console.log('my age is ', objProxy.age)
})

watchFn(function () {
	console.log('我是第三个函数')
	console.log('my name is ', objProxy.name)
})

watchFn(function () {
	console.log('我是第四个函数')
	console.log('my address is ')
})

objProxy.name = 'tom'