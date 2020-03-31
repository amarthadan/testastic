import React from 'react'
import {H1, Button, H3} from '@blueprintjs/core'

import './Home.scss'

const Home = () => {
  return (
    <div className="home">
      <H1>Welcome to Testastic!</H1>
      <H3>Start by creating a new test</H3>
      <Button large intent="primary" icon="add" />
    </div>
  )
}

export default Home
