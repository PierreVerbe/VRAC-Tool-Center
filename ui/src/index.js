import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { reducer } from './reducer/reducer'
import thunk from "redux-thunk"

import App from './component/App'
import './index.css'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

/*
  * Strat Create
    - https://reactflow.dev/

  * Monitoring simlulation
    - Terrain a gauche
    - Log avec curseur a droite (evolue log avec un play button)
    - Evolution pas à pas
    - Evolution vitesse du match
    - Version enlever
    - Tri id, date, name

  * Monitoring Stats
    - https://devexpress.github.io/devextreme-reactive/react/chart/demos/overview/multiple-axes/
    - Number step monitoring
    - Ratio fail/success
    - Points/steps monitoring ou temps

  * Autre
    - Docker rasp + freebox ouvert port
*/
