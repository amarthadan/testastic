import React, {useState} from 'react'
import {H1, FormGroup, InputGroup, Button, ButtonGroup} from '@blueprintjs/core'
import {useSelector, useDispatch} from 'react-redux'

import {exercisesSelector} from '../../redux/selectors'
import {addExercise} from '../../redux/reducers/creator'
import {generateIdentifier} from '../../utils/common'
import {buildAnswer, buildAssignment} from '../../utils/exercises'

import Exercise from '../exercises/Exercise'

import './NewTestScreen.scss'

const NewTestScreen = () => {
  const dispatch = useDispatch()
  const exercises = useSelector(exercisesSelector)
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const add = () => {
    dispatch(addExercise())
  }

  const build = () => {
    const document = {
      title,
      name,
      email,
      resultsId: generateIdentifier(),
      exercises: exercises.map((exercise) => ({
        type: exercise.type,
        description: exercise.description,
        assignment: buildAssignment(exercise),
      })),
      answeres: exercises.map((exercise) => buildAnswer(exercise)),
    }
    console.log(document)
  }

  return (
    <div className="new-test">
      <H1>New Test</H1>
      <div className="form-area">
        <FormGroup label="Title:" labelFor="title-input" inline>
          <InputGroup id="title-input" value={title} onChange={handleTitleChange} />
        </FormGroup>
        <FormGroup label="Name:" labelFor="name-input" inline>
          <InputGroup id="name-input" value={name} onChange={handleNameChange} />
        </FormGroup>
        <FormGroup label="Email:" labelFor="email-input" inline>
          <InputGroup id="email-input" value={email} onChange={handleEmailChange} />
        </FormGroup>
      </div>
      <div className="exercises">
        {exercises.map((exercise, index) => (
          <Exercise key={index} index={index} type={exercise.type} description={exercise.description} />
        ))}
        <ButtonGroup className="add-exercise" onClick={add}>
          <Button large intent="primary" icon="add" text="Add exercise" />
        </ButtonGroup>
      </div>
      <ButtonGroup className="build-test" onClick={build}>
        <Button large intent="success" icon="build" text="Build test" />
      </ButtonGroup>
    </div>
  )
}

export default NewTestScreen
