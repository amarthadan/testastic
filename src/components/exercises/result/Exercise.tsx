import React from 'react'
import {Card} from '@blueprintjs/core'

import Editor from '../../common/Editor'
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
      {exercise.description && <Editor readonly description rawInitialState={exercise.description} />}
      <div className="specific">
        <SpecificExercise />
      </div>
    </Card>
  )
}

export default Exercise
