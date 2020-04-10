import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FormGroup, InputGroup} from '@blueprintjs/core'

import {exerciseSelector} from '../../../redux/selectors/creator'
import {CreatorSpecificExerciseComponentProps, CreatorWordOrderExerciseState} from '../../../types'
import {RootState} from '../../../redux/reducers/root'
import {updateExercise} from '../../../redux/reducers/creator'

import './WordOrderExercise.scss'

const WordOrderExercise = ({index}: CreatorSpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as CreatorWordOrderExerciseState

  const handleSentenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateExercise({index, exercise: {...exercise, sentence: event.target.value}}))
  }

  return (
    <FormGroup label="Sentence:" inline contentClassName="sentence-input">
      <InputGroup fill onChange={handleSentenceChange} />
    </FormGroup>
  )
}

export default WordOrderExercise
