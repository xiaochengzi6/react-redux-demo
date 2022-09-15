import React, { useContext, useRef, useLayoutEffect, useReducer } from 'react'
import ReactReduxContext from './createContext'
import shallowEqual from './shallowEqual'
import Subscription from './Subscription'

// 这里使用 这个是为了方便后面能强制刷新
function storeStateUpdatesReducer(count) {
  return count + 1
}

function connect(mapStateToProps = () => {}, mapDispatchToProps = () => {}) {
  // 获取 store 的值 并组装成组件所需要的全部 props
  function childPropsSelector(store, wrapperProps) {
    const state = store.getState() // 拿到state

    const stateProps = mapStateToProps(state)
    const dispatchProps = mapDispatchToProps(store.dispatch)

    return Object.assign({}, stateProps, dispatchProps, wrapperProps)
  }

  // WrappedComponent就是使用connext包裹的自己的组件
  return function connectHOC(WrappedComponent) {
    // 这里是将这个当成一个组件被返回 比如 Count = connect(mapStateToProps, mapDispatchToProps)(Count)
    // ConnectFunction 就是 Count
    function ConnectFunction(props) {
      const { ...wrapperProps } = props

      const contextValue = useContext(ReactReduxContext)

      // 解构出store和parentSub
      const { store, subscription: parentSub } = contextValue

      // 组装最终的props
      const actualChildProps = childPropsSelector(store, wrapperProps)

      // 记录上次渲染参数
      const lastChildProps = useRef()

      // 使用useLayoutEffect也就是页面dom渲染结束的时候这个时候也能确保数据以及更改完成
      useLayoutEffect(() => {
        lastChildProps.current = actualChildProps
      }, [actualChildProps])

      // useReducer 用于触发强制更新
      const [, forceComponentUpdateDispatch] = useReducer(storeStateUpdatesReducer, 0)

      // 新建一个subscription实例 注意看这里的 parentSub 它是 Provider 中的 subscribe 也就是说
      // 它会在 provider 后去更新数据 确保了数据更新的顺序
      const subscription = new Subscription(store, parentSub)

      // state回调抽出来成为一个方法
      const checkForUpdates = () => {
        const newChildProps = childPropsSelector(store, wrapperProps)
        // 如果参数变了，记录新的值到lastChildProps上
        // 并且强制更新当前组件
        if (!shallowEqual(newChildProps, lastChildProps.current)) {
          lastChildProps.current = newChildProps

          // 需要一个API来强制更新当前组件
          forceComponentUpdateDispatch()

          // 然后通知子级更新
          subscription.notifyNestedSubs()
        }
      }

      // 使用subscription注册回调
      subscription.onStateChange = checkForUpdates

      // 将 onStateChange 添加至上一层 也就是 provider 中的 subscribe 中的 store 中 也就是说是 provider 更新完数据的 store
      subscription.trySubscribe()

      // 修改传给子级的context
      // 将subscription替换为自己的
      const overriddenContextValue = {
        ...contextValue,
        subscription,
      }

      // 渲染WrappedComponent
      // 再次使用ReactReduxContext包裹，传入修改过的context
      return (
        <ReactReduxContext.Provider value={overriddenContextValue}>
          <WrappedComponent {...actualChildProps} />
        </ReactReduxContext.Provider>
      )
    }

    return ConnectFunction
  }
}

export default connect
