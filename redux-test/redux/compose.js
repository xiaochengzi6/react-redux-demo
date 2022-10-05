/**
 * 组合 dispatch 函数
 * 最后的结果是这样 func = [1,2,3,4,5,6,7] => [1(2(3(4(5(6(7()))))))]
 * @param  {...any} func 
 * @returns 
 */
export default function compose(...funcs) {
  if(funcs.length === 0){
    return (args) => args
  }

  if(funcs.length === 1){
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => (a(b(...args))))
}
