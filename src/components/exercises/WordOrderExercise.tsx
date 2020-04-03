import React from 'react'
import {FormGroup, InputGroup} from '@blueprintjs/core'

import {ExerciseComponentProps} from '../../constants'

import './WordOrderExercise.scss'

const WordOrderExercise = ({disabled}: ExerciseComponentProps) => {
  return (
    <FormGroup label="Sentence:" inline contentClassName="sentence-input" disabled={disabled}>
      <InputGroup fill disabled={disabled} />
    </FormGroup>
  )
}

export default WordOrderExercise
