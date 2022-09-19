export default function createStore(Reducer, preloadedState) {
  // 这里获取初始值
  let state = preloadedState || Reducer(undefined, { type: '@INIT' })

  const listeners = []

  const getState = () => state

  const dispatch = (action) => {
    // 更新状态树
    state = Reducer(state, action)

    // 调用订阅的回调函数
    listeners.forEach((listener) => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)

    // 取消订阅
    return () => {
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
