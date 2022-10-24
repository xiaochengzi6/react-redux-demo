import React from 'react'

const ReactReduxContext = React.createContext()

export default ReactReduxContext

// 最重要的是其内部去维护了一个 context 然后每次 connect 都会依赖这个 context 去做出改变
