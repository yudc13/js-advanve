const name = 'jack'
function foo () {}
export { // 这个大括号不是对象的意思
	name,
	name as FName // as 起别名
}

export default foo