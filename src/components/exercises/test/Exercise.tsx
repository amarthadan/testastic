import React from 'react'
import {Card} from '@blueprintjs/core'
import {RawDraftContentState} from 'draft-js'

import Editor from '../../common/Editor'
import {testExerciseTypes} from '../../../utils/test'
import {ExerciseTypes} from '../../../types'

import './Exercise.scss'

interface ExerciseProps {
  index: number
  type: ExerciseTypes
  description: RawDraftContentState
}

const Exercise = ({index, type, description}: ExerciseProps) => {
  const SpecificExercise = testExerciseTypes[type].component

  return (
    <Card className="test-exercise">
      {description && <Editor readonly description rawInitialState={description} />}
      <div className="specific">{SpecificExercise && <SpecificExercise index={index} />}</div>
    </Card>
  )
}

export default Exercise
