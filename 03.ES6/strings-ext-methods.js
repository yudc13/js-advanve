let s = 'Hello world!';

// 判断字串
// 这里的n表示从第n个字符直到最后
console.log(s.includes('Hello', 0))
console.log(s.startsWith('Hello', 0))
// 第二个参数表示前n个字符
console.log(s.endsWith('Hello', 5))

// 字符串补全
console.log(s.padStart(20, '0'))
console.log(s.padEnd(20, '0'))
