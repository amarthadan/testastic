import React from 'react'

import Home from './components/Home'

import {useInitDB} from './hooks/database'

import './App.scss'

function App() {
  useInitDB()

  return <Home />
}

export default App
