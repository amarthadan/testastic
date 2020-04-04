import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FormGroup, InputGroup} from '@blueprintjs/core'

import {exerciseSelector} from '../../redux/selectors'
import {SpecificExerciseComponentProps} from '../../types'
import {RootState} from '../../redux/reducers/root'
import {updateExercise} from '../../redux/reducers/creator'

import './WordOrderExercise.scss'

const WordOrderExercise = ({disabled, index}: SpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index))

  const handleSentenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateExercise({index, exercise: {...exercise, sentence: event.target.value}}))
  }

  return (
    <FormGroup label="Sentence:" inline contentClassName="sentence-input" disabled={disabled}>
      <InputGroup fill disabled={disabled} onChange={handleSentenceChange} />
    </FormGroup>
  )
}

export default WordOrderExercise
