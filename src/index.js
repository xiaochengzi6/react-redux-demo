import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createStore } from './redux'
import Reducer from './reducer'
import TestContext from './TestContext'
import { Provider } from './react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore(Reducer)

const obj = {
  color: 'red',
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TestContext.Provider value={obj}>
        <App />
      </TestContext.Provider>
    </Provider>
  </React.StrictMode>
)
