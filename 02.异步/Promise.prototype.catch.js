const p = Promise.reject('error')

// p.then(res => {
// 	console.log('res: ', res)
// }).catch(err => { // 会捕获上面所有promise产生的异常
// 	console.log('err: ', err)
// })

// 下面两个方法是相互独立的 互不影响
p.then(res => {})

p.catch(err => {})