import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, MenuItem, FormGroup, Card, TextArea, ButtonGroup, Intent} from '@blueprintjs/core'
import {ItemRenderer, Select} from '@blueprintjs/select'

import {exerciseTypes} from '../../utils/exercises'
import {removeExercise, updateExerciseType, updateExerciseDescription} from '../../redux/reducers/creator'
import {ExerciseTypes} from '../../types'

import './Exercise.scss'

const ExerciseTypeSelect = Select.ofType<ExerciseTypes>()

const renderType: ItemRenderer<ExerciseTypes> = (exerciseType, {handleClick, modifiers}) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={exerciseType}
      onClick={handleClick}
      text={exerciseTypes[exerciseType].name}
    />
  )
}

interface ExerciseProps {
  index: number
  type: ExerciseTypes
  description: string
}

const Exercise = ({index, type, description}: ExerciseProps) => {
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [doneButtonIntent, setDoneButtonIntent] = useState<Intent>(Intent.PRIMARY)

  const SpecificExercise = exerciseTypes[type].component

  const markAsDone = () => {
    setDoneButtonIntent(Intent.SUCCESS)
    setDisabled(true)
  }

  const remove = () => {
    dispatch(removeExercise(index))
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateExerciseDescription({index, description: event.target.value}))
  }

  return (
    <Card className="exercise">
      <Button minimal intent="danger" icon="trash" className="remove-button" onClick={remove} />
      <FormGroup label="Exercise type:" inline disabled={disabled}>
        {/* TODO: findDOMNode is deprecated in StrictMode error (see console) */}
        {/* TODO: last selected item is not highligted */}
        <ExerciseTypeSelect
          items={Object.values(ExerciseTypes)}
          itemRenderer={renderType}
          onItemSelect={(selectedType) => {
            dispatch(updateExerciseType({index, type: selectedType}))
          }}
          filterable={false}
          popoverProps={{minimal: true}}
          disabled={disabled}
        >
          <Button text={exerciseTypes[type].name} rightIcon="caret-down" disabled={disabled} />
        </ExerciseTypeSelect>
      </FormGroup>
      <FormGroup label="Description:" disabled={disabled}>
        <TextArea
          growVertically={true}
          fill
          disabled={disabled}
          value={description}
          onChange={handleDescriptionChange}
        />
      </FormGroup>
      <div className="specific">{SpecificExercise && <SpecificExercise disabled={disabled} index={index} />}</div>
      <ButtonGroup className="done-button">
        <Button text="Done" icon="tick" intent={doneButtonIntent} onClick={markAsDone} disabled={disabled} />
      </ButtonGroup>
    </Card>
  )
}

export default Exercise
