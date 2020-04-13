import React from 'react'
import {FormGroup} from '@blueprintjs/core'
import {useDispatch, useSelector} from 'react-redux'
import {convertToRaw, EditorState} from 'draft-js'

import Editor from '../../common/Editor'
import {RootState} from '../../../redux/reducers/root'
import {exerciseSelector} from '../../../redux/selectors/test'
import {updateExercise} from '../../../redux/reducers/test'
import {TestSpecificExerciseComponentProps, TestFreeTextExerciseState} from '../../../types'

const FreeTextExercise = ({index}: TestSpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as TestFreeTextExerciseState

  const handleAnswerChange = (editorState: EditorState) => {
    const newState = {
      ...exercise,
      answer: convertToRaw(editorState.getCurrentContent()),
    }

    dispatch(updateExercise({index, exercise: newState}))
  }

  return (
    <>
      <FormGroup label="Answer:">
        <Editor onChange={handleAnswerChange} />
      </FormGroup>
    </>
  )
}

export default FreeTextExercise
