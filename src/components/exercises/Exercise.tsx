import React, {useState} from 'react'
import {Button, MenuItem, FormGroup, Card, TextArea, ButtonGroup, Intent} from '@blueprintjs/core'
import {ItemRenderer, Select} from '@blueprintjs/select'

import {ExerciseType, exerciseTypes, defaultExerciseType} from '../../constants'
import WordOrderExercise from './WordOrderExercise'

import './Exercise.scss'

const ExerciseTypeSelect = Select.ofType<ExerciseType>()

const renderType: ItemRenderer<ExerciseType> = (exerciseType, {handleClick, modifiers}) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return <MenuItem active={modifiers.active} key={exerciseType.id} onClick={handleClick} text={exerciseType.title} />
}

const Exercise = () => {
  const [type, setType] = useState<ExerciseType>(defaultExerciseType)
  const [disabled, setDisabled] = useState(false)
  const [doneButtonIntent, setDoneButtonIntent] = useState<Intent>(Intent.PRIMARY)

  let specificExercise = null
  if (type.id === 'word-order') {
    specificExercise = <WordOrderExercise disabled={disabled} />
  }

  const markAsDone = () => {
    setDoneButtonIntent(Intent.SUCCESS)
    setDisabled(true)
  }

  return (
    <Card className="exercise">
      <Button minimal intent="danger" icon="trash" className="remove-button" />
      <FormGroup label="Exercise type:" inline disabled={disabled}>
        <ExerciseTypeSelect
          items={exerciseTypes}
          itemRenderer={renderType}
          onItemSelect={(selectedType) => {
            setType(selectedType)
          }}
          filterable={false}
          popoverProps={{minimal: true}}
          disabled={disabled}
        >
          <Button text={type.title} rightIcon="caret-down" disabled={disabled} />
        </ExerciseTypeSelect>
      </FormGroup>
      <FormGroup label="Description:" disabled={disabled}>
        <TextArea growVertically={true} fill disabled={disabled} />
      </FormGroup>
      <div className="specific">{specificExercise}</div>
      <ButtonGroup className="done-button">
        <Button text="Done" icon="tick" intent={doneButtonIntent} onClick={markAsDone} disabled={disabled} />
      </ButtonGroup>
    </Card>
  )
}

export default Exercise
