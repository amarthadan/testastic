import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, MenuItem, FormGroup, Card, TextArea, ButtonGroup, Intent} from '@blueprintjs/core'
import {ItemRenderer, Select} from '@blueprintjs/select'

import {ExerciseTypes, exerciseTypes} from '../../constants'
import {removeExercise, updateExerciseType, updateExerciseDescription} from '../../redux/reducers/creator'
import {RootState} from '../../redux/reducers/root'
import {exerciseSelector} from '../../redux/selectors'

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

type ExerciseProps = {
  index: number
}

const Exercise = ({index}: ExerciseProps) => {
  const dispatch = useDispatch()
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index))
  const [disabled, setDisabled] = useState(false)
  const [doneButtonIntent, setDoneButtonIntent] = useState<Intent>(Intent.PRIMARY)

  const SpecificExercise = exerciseTypes[exercise.type].component

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
          <Button text={exerciseTypes[exercise.type].name} rightIcon="caret-down" disabled={disabled} />
        </ExerciseTypeSelect>
      </FormGroup>
      <FormGroup label="Description:" disabled={disabled}>
        <TextArea
          growVertically={true}
          fill
          disabled={disabled}
          value={exercise.description}
          onChange={handleDescriptionChange}
        />
      </FormGroup>
      <div className="specific">{SpecificExercise && <SpecificExercise disabled={disabled} />}</div>
      <ButtonGroup className="done-button">
        <Button text="Done" icon="tick" intent={doneButtonIntent} onClick={markAsDone} disabled={disabled} />
      </ButtonGroup>
    </Card>
  )
}

export default Exercise
