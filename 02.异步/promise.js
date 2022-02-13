new Promise((resolve, reject) => {
    reject(new Error())
}).then(value => {
    console.log('value1: ', value)
})
.catch(error => {
    console.log('error: ', error)
})
.then(value => {
    console.log('value2: ', value)
})