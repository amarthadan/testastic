import React from 'react'
import {Card} from '@blueprintjs/core'

import {specificExercise} from '../../../utils/result'
import {ResultExerciseState} from '../../../types'

import './Exercise.scss'

type ExerciseProps = {
  exercise: ResultExerciseState
}

const Exercise = ({exercise}: ExerciseProps) => {
  const SpecificExercise = specificExercise(exercise)
  return (
    <Card className="result-exercise">
      <p>{exercise.description}</p>
      <div className="specific">
        <SpecificExercise />
      </div>
    </Card>
  )
}

export default Exercise
