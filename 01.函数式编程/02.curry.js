function checkAge(age) {
    const min = 18
    return age > min
}

function checkAge2(min) {
    return function (age) {
        return age > min
    }
}

const checkAge3 = min => age => age > min

console.log(checkAge3(18)(2))

const checkAge18 = checkAge2(18)

function add (a, b, c) {
    return a + b + c
}

function curry(fn) {
    const len = fn.length
    return function inner(...args) {
        return args.length >= len
            ? fn.apply(this, args)
            : (...innerArgs) => inner.call(this, ...args, ...innerArgs)
    }
}

function currying(fn, ...rest) {
    return rest.length >= fn.length ? fn.apply(this, rest) : (...args) => currying(fn, ...rest, ...args)
}

const curryAdd = currying(add)
console.log(curryAdd(1)(2)(3))
