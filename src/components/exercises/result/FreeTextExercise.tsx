import React from 'react'
import {Label, Callout, Intent} from '@blueprintjs/core'

import {ResultFreeTextExerciseState} from '../../../types'

const FreeTextExercise = ({answer}: ResultFreeTextExerciseState) => {
  return (
    <>
      <Label>Answer:</Label>
      <Callout intent={Intent.PRIMARY} icon={null}>
        {answer}
      </Callout>
    </>
  )
}

export default FreeTextExercise
