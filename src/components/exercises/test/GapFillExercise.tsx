import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FormGroup, InputGroup} from '@blueprintjs/core'
import {ContentBlock, ContentState, CompositeDecorator} from 'draft-js'

import Editor from '../../common/Editor'
import {exerciseSelector} from '../../../redux/selectors/test'
import {updateExercise} from '../../../redux/reducers/test'
import {RootState} from '../../../redux/reducers/root'
import {TestSpecificExerciseComponentProps, TestGapFillExerciseState} from '../../../types'

const GapFillExercise = ({index}: TestSpecificExerciseComponentProps) => {
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as TestGapFillExerciseState

  const recognizePlaceholder = (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState,
  ) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity()
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'INPUT'
    }, callback)
  }

  type InputProps = {
    contentState: ContentState
    entityKey: string
  }

  const Input = ({contentState, entityKey}: InputProps) => {
    const dispatch = useDispatch()
    // TODO: come up with better solution
    const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as TestGapFillExerciseState
    const id = contentState.getEntity(entityKey).getData().id

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newState = {
        ...exercise,
        answer: {...exercise.answer, [id]: event.target.value},
      }

      dispatch(updateExercise({index, exercise: newState}))
    }

    return <InputGroup fill={false} className="input" onChange={handleAnswerChange} />
  }

  const decorator = new CompositeDecorator([
    {
      strategy: recognizePlaceholder,
      component: Input,
    },
  ])

  return (
    <>
      <FormGroup>
        <Editor readonly rawInitialState={exercise.assignment} decorator={decorator} />
      </FormGroup>
    </>
  )
}

export default GapFillExercise
