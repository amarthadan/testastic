import React from 'react'
import {FormGroup, TextArea} from '@blueprintjs/core'
import {useDispatch, useSelector} from 'react-redux'

import {RootState} from '../../../redux/reducers/root'
import {exerciseSelector} from '../../../redux/selectors/test'
import {updateExercise} from '../../../redux/reducers/test'
import {TestSpecificExerciseComponentProps, TestFreeTextExerciseState} from '../../../types'

const FreeTextExercise = ({index}: TestSpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as TestFreeTextExerciseState

  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newState = {
      ...exercise,
      answer: event.target.value,
    }

    dispatch(updateExercise({index, exercise: newState}))
  }

  return (
    <FormGroup label="Answer:">
      <TextArea growVertically={true} fill onChange={handleAnswerChange} />
    </FormGroup>
  )
}

export default FreeTextExercise
