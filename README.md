## 阅读以下文章获取此仓库的具体用法


[从一个计时器来了解 React-redux 并实现简单版](https://github.com/xiaochengzi6/blog/issues/31)



redux 源码中为了适应更多的轮子就不得不这样严谨，通过提供一个“厚实”的基础来支持围绕它所开源的作品。

redux 的核心代码就是在`createStore`函数中如果抛开 `applyMiddleware`函数不谈其实便很好理解，主要的功能就是处理数据，数据的获取，数据的修改以及数据的监听，最重要的功能就是围绕这三者进行 `getState(), dispatch(), subscribe()`

由于要满足数据状态存改前的副作用 便有了 `applyMiddleware` 的概念 使其能过够在多个中间件（副作用）下能过够去处理数据 其核心之处就是通过修改 dispatch 函数让其能够在合适的位置调用真正的派发函数 当然中间件也要满足其 applyMiddleware 的调用方式 比如 redux-thunk 

~~~js
function reduxThunk({getState, dispatch}){
  return (next) => (action) => {
    if(typeof action === 'function'){
      return action(dispatch, getState)
    }

    return next(action)
  }
}
~~~
next 就是被包装的 dispatch 而 action 可以被看作是 放入 dispatch 函数中的回调函数 



