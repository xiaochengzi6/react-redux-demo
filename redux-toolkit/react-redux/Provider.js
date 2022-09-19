import React, { useMemo, useEffect } from 'react'
import ReactReduxContext from './createContext'
import Subscription from './Subscription'

function Provider(props) {
  const { store, children } = props

  // 输出 {store, subscription} 的对像 可以通过 connect 中去取出这样的对象
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store)

    // 第一次就会使用 notifyNestedSubs 作为 onStateChange 函数 后面调用的时候就会触发子组件往里面存入的回调函数
    subscription.onStateChange = subscription.notifyNestedSubs

    return {
      store,
      subscription,
    }
  }, [store])

  // 保存上一次的 store 的值
  const previousState = useMemo(() => store.getState(), [store])

  // 每次contextValue或者previousState变化的时候
  useEffect(() => {
    const { subscription } = contextValue

    // 开始调用 this.store.subscribe(onStateChange)
    subscription.trySubscribe()

    if (previousState !== store.getState()) {
      // 这里的 state 值发生改变就会调用 子组件放在这里的 回调函数
      subscription.notifyNestedSubs()
    }
  }, [contextValue, previousState])

  return <ReactReduxContext.Provider value={contextValue}>{children}</ReactReduxContext.Provider>
}

export default Provider
