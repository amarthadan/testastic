import React from 'react'
import {Label, Tag, Intent} from '@blueprintjs/core'

import {ResultWordOrderExerciseState} from '../../../types'

import './WordOrderExercise.scss'

const WordOrderExercise = ({answer, correctAnswer}: ResultWordOrderExerciseState) => {
  return (
    <>
      <div className="section">
        <Label>Your answer:</Label>
        <div className="answer">
          {answer?.map((word, index) => (
            <Tag large minimal intent={correctAnswer[index] === word ? Intent.SUCCESS : Intent.DANGER}>
              {word}
            </Tag>
          ))}
        </div>
      </div>
      <div className="section">
        <Label>Correct answer:</Label>
        <p>{correctAnswer.join(' ')}</p>
      </div>
    </>
  )
}

export default WordOrderExercise
