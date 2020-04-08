import React from 'react'
import {H1, Button, H3} from '@blueprintjs/core'
import {Link} from 'react-router-dom'

import './HomeScreen.scss'

const HomeScreen = () => {
  return (
    <div className="home">
      <H1>Welcome to Testastic!</H1>
      <H3>Start by creating a new test</H3>
      <Link to="/create" className="add-button">
        <Button large intent="primary" icon="add" />
      </Link>
    </div>
  )
}

export default HomeScreen
