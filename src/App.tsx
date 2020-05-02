import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {H1, FocusStyleManager, Navbar, NavbarGroup, Button, Alignment, FormGroup} from '@blueprintjs/core'

import PrivateRoute from './components/routing/PrivateRoute'
import HomeScreen from './components/screens/HomeScreen'
import NewTestScreen from './components/screens/NewTestScreen'
import TestScreen from './components/screens/TestScreen'
import ResultScreen from './components/screens/ResultScreen'
import ResultsScreen from './components/screens/ResultsScreen'
import Login from './components/screens/Login'

import './database'
import {setLoggedIn, setInitialized, setVerified} from './redux/reducers/auth'
import {loggedInSelector, initializedSelector} from './redux/selectors/auth'
import {auth} from './database'

import './App.scss'

function App() {
  const dispatch = useDispatch()
  FocusStyleManager.onlyShowFocusOnTabs()
  const initialized = useSelector(initializedSelector)
  const loggedIn = useSelector(loggedInSelector)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setLoggedIn(true))
        dispatch(setVerified(user.emailVerified))
      } else {
        dispatch(setLoggedIn(false))
      }
      dispatch(setInitialized(true))
    })
  }, [dispatch])

  const signOut = () => {
    auth.signOut()
    dispatch(setLoggedIn(false))
    dispatch(setVerified(false))
  }

  return (
    <>
      {initialized && loggedIn && (
        <Navbar id="navbar">
          <NavbarGroup align={Alignment.RIGHT}>
            <FormGroup inline label={auth.currentUser?.displayName}>
              <Button minimal icon="log-out" text="Logout" onClick={signOut} />
            </FormGroup>
          </NavbarGroup>
        </Navbar>
      )}
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
    </>
  )
}

export default App
