import React from 'react'
import {useDispatch} from 'react-redux'
import {Button, MenuItem, FormGroup, Card} from '@blueprintjs/core'
import {ItemRenderer, Select} from '@blueprintjs/select'
import {EditorState, convertToRaw} from 'draft-js'

import Editor from '../../common/Editor'
import {creatorExerciseTypes} from '../../../utils/creator'
import {removeExercise, updateExerciseType, updateExerciseDescription} from '../../../redux/reducers/creator'
import {ExerciseTypes} from '../../../types'

import './Exercise.scss'

const CreatorExerciseTypeSelect = Select.ofType<ExerciseTypes>()

const renderType: ItemRenderer<ExerciseTypes> = (exerciseType, {handleClick, modifiers}) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={exerciseType}
      onClick={handleClick}
      text={creatorExerciseTypes[exerciseType].name}
    />
  )
}

interface ExerciseProps {
  index: number
  type: ExerciseTypes
}

const Exercise = ({index, type}: ExerciseProps) => {
  const dispatch = useDispatch()

  const SpecificExercise = creatorExerciseTypes[type].component

  const remove = () => {
    dispatch(removeExercise(index))
  }

  const handleDescriptionChange = (editorState: EditorState) => {
    dispatch(updateExerciseDescription({index, description: convertToRaw(editorState.getCurrentContent())}))
  }

  return (
    <Card className="creator-exercise">
      <Button minimal intent="danger" icon="trash" className="remove-button" onClick={remove} />
      <FormGroup label="Exercise type:" inline>
        {/* TODO: findDOMNode is deprecated in StrictMode error (see console) */}
        {/* TODO: last selected item is not highligted */}
        <CreatorExerciseTypeSelect
          items={Object.values(ExerciseTypes)}
          itemRenderer={renderType}
          onItemSelect={(selectedType) => {
            dispatch(updateExerciseType({index, type: selectedType}))
          }}
          filterable={false}
          popoverProps={{minimal: true}}
        >
          <Button text={creatorExerciseTypes[type].name} rightIcon="caret-down" />
        </CreatorExerciseTypeSelect>
      </FormGroup>
      <FormGroup label="Description:">
        <Editor onChange={handleDescriptionChange} />
      </FormGroup>
      <div className="specific">{SpecificExercise && <SpecificExercise index={index} />}</div>
    </Card>
  )
}

export default Exercise
