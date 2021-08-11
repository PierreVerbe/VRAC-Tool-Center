import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { studentReducer } from './reducer/studentReducer'
import thunk from "redux-thunk"

import App from './component/App'
import './index.css'

const store = createStore(studentReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
