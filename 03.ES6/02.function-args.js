// const F = () => 1

// new F() // error

// 函数默认参数
// 如果函数参数使用默认值，那么函数参数这里会形成单独的上下文
function fn(n = 1, m = 4) {
	return n + m
}

console.log(fn(1))