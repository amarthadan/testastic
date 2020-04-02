import React from 'react'
import {FormGroup, InputGroup} from '@blueprintjs/core'

import './WordOrderExercise.scss'

type WordOrderExerciseProps = {
  disabled: boolean
}

const WordOrderExercise = ({disabled}: WordOrderExerciseProps) => {
  return (
    <FormGroup label="Sentence:" inline contentClassName="sentence-input" disabled={disabled}>
      <InputGroup fill disabled={disabled} />
    </FormGroup>
  )
}

export default WordOrderExercise
