let thenable = {
    then: function(resolve, reject) {
        reject(42);
    }
};
// p1 的状态取决于thenable对象的then的状态
// let p1 = Promise.resolve(thenable);
// p1.then(function(value) {
//     console.log('ok: ', value);  // 42
// }).catch(function(value) {
//     console.log('error: ', value);  // 42
// });


function getFoo () {
    return new Promise(function (resolve, reject) {
        resolve('foo')
    })
}

const gen = function * () {
    console.log('进来了')
    try {
        const foo = yield getFoo()
        console.log('foo: ', foo)
    } catch (e) {
        console.log('error: ', e)
    }
}

function run(gen) {
    const it = gen()

    function run(result) {
        if (result.done) {
            return result.value
        }
        return Promise.resolve(result.value).then(function (value) {
            return run(it.next(value))
        })
    }
    run(it.next())
}

// const g = gen() // 第一次调用并不会执行，需要调用next方法
// g.next()
// g.next("哈哈哈") // 作为上一个yield的返回值

run(gen)


new Promise((resolve, reject) => {
    throw new Error('error-----')
}).catch(error => {
    console.log('error: ', error)
})

new Promise((resolve, reject) => {
    resolve(1)
}).finally(() => {
    console.log('第一个')
}).then(value => {
    console.log('value: ', value)
}).finally(() => {
    console.log('第二个')
    return 2
})
