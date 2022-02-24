const info = {
	name: 'jack',
	age: 12
}

setTimeout(() => {
	info.name = 'kobe'
}, 1000)

module.exports = info