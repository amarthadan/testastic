import React from 'react'
import {Label} from '@blueprintjs/core'

import Editor from '../../common/Editor'
import {ResultFreeTextExerciseState} from '../../../types'

const FreeTextExercise = ({answer}: ResultFreeTextExerciseState) => {
  return (
    <>
      <Label>Answer:</Label>
      <Editor readonly result rawInitialState={answer} />
    </>
  )
}

export default FreeTextExercise
