import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {H1, FocusStyleManager} from '@blueprintjs/core'

import HomeScreen from './components/screens/HomeScreen'
import NewTestScreen from './components/screens/NewTestScreen'
import TestScreen from './components/screens/TestScreen'
import ResultScreen from './components/screens/ResultScreen'
import ResultsScreen from './components/screens/ResultsScreen'

import {useInitDB} from './hooks/database'
import store from './redux/store'

import './App.scss'

function App() {
  useInitDB()
  FocusStyleManager.onlyShowFocusOnTabs()

  return (
    <Provider store={store}>
      {/* TODO: Refactor routes into constants */}
      <BrowserRouter>
        <Switch>
          <Route path="/create" component={NewTestScreen} />
          <Route path="/tests/:id" component={TestScreen} />
          <Route path="/answers/:id" component={ResultScreen} />
          <Route path="/results/:id" component={ResultsScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route path="/">
            <H1>Page not found</H1>
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
