import React from 'react'
import {Label, Callout, RadioGroup, Radio} from '@blueprintjs/core'

import {ResultChoiceExerciseState} from '../../../types'

import './ChoiceExercise.scss'

const ChoiceExercise = ({assignment, answer, correctAnswer}: ResultChoiceExerciseState) => {
  return (
    <>
      <Label>Question:</Label>
      <Callout className="question">{assignment.question}</Callout>
      <RadioGroup onChange={() => null} selectedValue={answer}>
        {assignment.answers.map((choice) => (
          <Radio
            key={choice}
            value={choice}
            label={choice}
            className={choice === correctAnswer ? 'correct' : choice === answer ? 'incorrect' : ''}
          />
        ))}
      </RadioGroup>
    </>
  )
}

export default ChoiceExercise
