import * as main from './index.js' // 这个拿到的是export default和export xx的所有内容

export { format } from './utils.js'

export * from './utils.js'

// 默认导入 只会导入export default的内容，拿不到export xxx的内容
import bar from './utils.js'

console.log(main)
console.log(main.default)
console.log(bar)