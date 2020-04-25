import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {H1, FocusStyleManager} from '@blueprintjs/core'

import PrivateRoute from './components/routing/PrivateRoute'
import HomeScreen from './components/screens/HomeScreen'
import NewTestScreen from './components/screens/NewTestScreen'
import TestScreen from './components/screens/TestScreen'
import ResultScreen from './components/screens/ResultScreen'
import ResultsScreen from './components/screens/ResultsScreen'
import Login from './components/screens/Login'

import './database'
import {setLoggedIn, setInitialized} from './redux/reducers/auth'
import {auth} from './database'

import './App.scss'

function App() {
  const dispatch = useDispatch()
  FocusStyleManager.onlyShowFocusOnTabs()

  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setLoggedIn(true))
    } else {
      dispatch(setLoggedIn(false))
    }
    dispatch(setInitialized(true))
  })

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/create">
          <NewTestScreen />
        </PrivateRoute>
        <PrivateRoute path="/tests/:id">
          <TestScreen />
        </PrivateRoute>
        <PrivateRoute path="/answers/:id">
          <ResultScreen />
        </PrivateRoute>
        <PrivateRoute path="/results/:id">
          <ResultsScreen />
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <HomeScreen />
        </PrivateRoute>
        <Route path="/login" component={Login} />
        <Route path="/">
          <H1>Page not found</H1>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
