import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'

import HomeScreen from './components/screens/HomeScreen'
import NewTestScreen from './components/screens/NewTestScreen'

import {useInitDB} from './hooks/database'
import store from './redux/store'

import './App.scss'

function App() {
  useInitDB()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/new">
            <NewTestScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
