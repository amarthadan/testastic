import React from 'react'
import {FormGroup, TextArea} from '@blueprintjs/core'

const FreeTextExercise = () => {
  return (
    <FormGroup label="Answer:">
      <TextArea growVertically={true} fill />
    </FormGroup>
  )
}

export default FreeTextExercise
