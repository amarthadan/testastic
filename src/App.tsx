import React from 'react'

import Home from './components/Home'

import {useInitDB} from './hooks/database'

import './App.css'

function App() {
  useInitDB()

  return <Home />
}

export default App
