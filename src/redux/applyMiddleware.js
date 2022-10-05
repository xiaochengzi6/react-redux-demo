import compose from "./compose"

/**
 * 中间件 
 * @param  {...any} middlewares 
 * @returns 
 */
export default function applyMiddleware(...middlewares){
  return (createStore) => (redux, preloadState) =>{
    const store = createStore(redux, preloadState)

    let dispatch = () => {
      // 防止在构建的时候被意外调用

      // 这样包装的 dispatch 的好处：这个时候不能去调用因为还没有构建完全，如果在构建时提前除法就会出现问题
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }

    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    // 将包装好的dispatch传出去
    return {
      ...store,
      dispatch
    }
  }
}