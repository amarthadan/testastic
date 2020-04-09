import React from 'react'
import {Card} from '@blueprintjs/core'

import {testExerciseTypes} from '../../../utils/test'
import {ExerciseTypes} from '../../../types'

import './Exercise.scss'

interface ExerciseProps {
  index: number
  type: ExerciseTypes
  description: string
}

const Exercise = ({index, type, description}: ExerciseProps) => {
  const SpecificExercise = testExerciseTypes[type].component

  return (
    <Card className="test-exercise">
      <p>{description}</p>
      <div className="specific">{SpecificExercise && <SpecificExercise index={index} />}</div>
    </Card>
  )
}

export default Exercise
