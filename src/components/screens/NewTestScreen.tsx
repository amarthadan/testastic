import React from 'react'
import {H1, FormGroup, InputGroup, Button, ButtonGroup} from '@blueprintjs/core'

import Exercise from '../exercises/Exercise'

import './NewTestScreen.scss'

const NewTestScreen = () => {
  return (
    <div className="new-test">
      <H1>New Test</H1>
      <div className="form-area">
        <FormGroup label="Title:" labelFor="title-input" inline>
          <InputGroup id="title-input" />
        </FormGroup>
        <FormGroup label="Name:" labelFor="name-input" inline>
          <InputGroup id="name-input" />
        </FormGroup>
        <FormGroup label="Email:" labelFor="email-input" inline>
          <InputGroup id="email-input" />
        </FormGroup>
      </div>
      <div className="exercises">
        <Exercise />
        <ButtonGroup className="add-exercise">
          <Button large intent="primary" icon="add" text="Add exercise" />
        </ButtonGroup>
      </div>
    </div>
  )
}

export default NewTestScreen
