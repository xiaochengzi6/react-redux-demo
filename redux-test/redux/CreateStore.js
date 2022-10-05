
/**
 * 创建 store 用于管理数据的状态
 * @param {*} reducer reducer 函数
 * @param {*} preloaderState 初始值
 * @param {*} applyMiddleware 中间件
 * @returns 
 */
export default function createStore(reducer, preloaderState, enhancer) {
  if(
    (typeof preloaderState === 'function' && typeof enhancer === 'function') || 
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ){
    throw new Error('错误的使用方式')
  }

  if(typeof preloaderState === 'function' && typeof enhancer === 'undefined'){
    enhancer = preloaderState
    preloaderState = void 0
  }

  if(typeof enhancer !== 'undefined'){
    if(typeof enhancer !== 'function'){
      return new Error('enhancer 不是函数')
    }

    // 这里就会处理 dispatch 函数 使其能够在派发 action 时做一些副作用
    return enhancer(createStore)(reducer, preloaderState)
  }

  if(typeof reducer === 'undefined'){
    return new Error('reducer 不是函数')
  }

  /*-------这里开始就并不是源码内容了 源码中做的更加细致严谨------*/

  // 这里获取初始值
  let state = preloaderState || reducer(undefined, { type: '@INIT' })

  const listeners = []

  const getState = () => state

  const dispatch = (action) => {
    // 更新状态树
    state = reducer(state, action)

    // 调用订阅的回调函数
    listeners.forEach((listener) => listener())
  }

  // 注册订阅函数
  const subscribe = (listener) => {
    listeners.push(listener)

    // 取消订阅
    return () => {
      // 遍历之前的订阅函数是否匹配了这次的订阅函数
      const index = listeners.find((item) => item === listener)
      listeners.splice(index, 1)
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}
