import React from 'react'
import {H1, FormGroup, InputGroup, Button, ButtonGroup} from '@blueprintjs/core'
import {useSelector, useDispatch} from 'react-redux'

import {exercisesSelector} from '../../redux/selectors'
import {addExercise} from '../../redux/reducers/creator'

import Exercise from '../exercises/Exercise'

import './NewTestScreen.scss'

const NewTestScreen = () => {
  const dispatch = useDispatch()
  const exerices = useSelector(exercisesSelector)

  const add = () => {
    dispatch(addExercise())
  }

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
        {exerices.map((exercise, index) => (
          <Exercise key={index} index={index} type={exercise.type} description={exercise.description} />
        ))}
        <ButtonGroup className="add-exercise" onClick={add}>
          <Button large intent="primary" icon="add" text="Add exercise" />
        </ButtonGroup>
      </div>
    </div>
  )
}

export default NewTestScreen
