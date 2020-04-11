import React, {FormEvent} from 'react'
import {Label, Callout, RadioGroup, Radio} from '@blueprintjs/core'
import {useDispatch, useSelector} from 'react-redux'

import {RootState} from '../../../redux/reducers/root'
import {exerciseSelector} from '../../../redux/selectors/test'
import {updateExercise} from '../../../redux/reducers/test'
import {TestSpecificExerciseComponentProps, TestChoiceExerciseState} from '../../../types'

import './ChoiceExercise.scss'

const ChoiceExercise = ({index}: TestSpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as TestChoiceExerciseState

  const handleAnswerChange = (event: FormEvent<HTMLInputElement>) => {
    const newState = {
      ...exercise,
      answer: event.currentTarget.value,
    }

    dispatch(updateExercise({index, exercise: newState}))
  }

  return (
    <>
      <Label>Question:</Label>
      <Callout className="question">{exercise.assignment.question}</Callout>
      <RadioGroup onChange={handleAnswerChange} selectedValue={exercise.answer}>
        {exercise.assignment.answers.map((answer) => (
          <Radio key={answer} value={answer} label={answer} className="radio" />
        ))}
      </RadioGroup>
    </>
  )
}

export default ChoiceExercise
