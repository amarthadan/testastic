import React from 'react'
import {ContentBlock, ContentState, CompositeDecorator} from 'draft-js'

import Editor from '../../common/Editor'
import {ResultGapFillExerciseState} from '../../../types'

const GapFillExercise = ({assignment, answer, correctAnswer}: ResultGapFillExerciseState) => {
  const recognizeAnswer = (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState,
  ) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity()
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'INPUT'
    }, callback)
  }

  type AnswerProps = {
    contentState: ContentState
    entityKey: string
  }

  const Answer = ({contentState, entityKey}: AnswerProps) => {
    const id = contentState.getEntity(entityKey).getData().id
    const correctAnswerText = correctAnswer[id]
    const answerText = answer && answer[id]

    return correctAnswerText === answerText ? (
      <span className="correct-answer">{correctAnswerText}</span>
    ) : answerText ? (
      <>
        <span className="wrong-answer">{answerText}</span>
        <span className="correct-answer">{correctAnswerText}</span>
      </>
    ) : (
      <>
        <span className="missing-answer">?</span>
        <span className="correct-answer">{correctAnswerText}</span>
      </>
    )
  }

  const decorator = new CompositeDecorator([
    {
      strategy: recognizeAnswer,
      component: Answer,
    },
  ])

  return <Editor readonly result rawInitialState={assignment} decorator={decorator} />
}

export default GapFillExercise
