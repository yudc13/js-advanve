exports.x = 'b1'
// 当这里require a模块时，发现a模块也引用了自己 那么就不会再向下执行了
console.log('我是b: ', require('./a').x)
exports.x = 'b2'

// 最终b模块导出的时b2