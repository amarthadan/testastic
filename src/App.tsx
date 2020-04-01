import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import HomeScreen from './components/screens/HomeScreen'
import NewTestScreen from './components/screens/NewTestScreen'

import {useInitDB} from './hooks/database'

import './App.scss'

function App() {
  useInitDB()

  return (
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
  )
}

export default App
