function compose() {
    // 获取参数个数
    const len = arguments.length
    const _args = arguments
    return (args) => {
        // 得到最后一个参数
        let index = len - 1
        // 得到最后一个函数的执行结果
        let result = index ? _args[index](args) : _args[0](args)
        // 依次调用剩下的函数
        while (index--) {
            result = _args[index](result)
        }
        return result
    }
}

function compose2 () {
    return args => {
        return Array.prototype.slice.call(arguments).reverse().reduce((acc, fn) => fn(acc), args)
    }
}

function composeLeft () {
    return compose.apply(null, [].reverse.apply(arguments))
}

function reverse(array) {
    return array.reverse()
}

function getFirst(array) {
    return array[0]
}

const f = compose2(getFirst, reverse)

console.log(f([1,2,3,5]))

const add = function (x) { return x + 5; }  //加法允许
const mul= function (x) { return x * 5; }  //乘法运算
const sub= function (x) { return x - 5; }  //减法运算
const div = function (x) { return x / 5; }  //除法运算
const fn = composeLeft(add, mul, sub, div);
console.log(fn(50))