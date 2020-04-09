import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Label, Tag} from '@blueprintjs/core'

import {RootState} from '../../../redux/reducers/root'
import {exerciseSelector} from '../../../redux/selectors/test'
import {updateExercise} from '../../../redux/reducers/test'
import {TestSpecificExerciseComponentProps, TestWordOrderExerciseState} from '../../../types'

import './WordOrderExercise.scss'

const WordOrderExercise = ({index}: TestSpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as TestWordOrderExerciseState
  const shuffledWords = exercise.assignment
  const sentenceWords = exercise.answer

  const handleShuffledWordClick = (i: number) => {
    const word = shuffledWords[i]
    const newState = {
      ...exercise,
      assignment: [...shuffledWords.slice(0, i), ...shuffledWords.slice(i + 1)],
      answer: sentenceWords ? [...sentenceWords, word] : [word],
    }

    dispatch(updateExercise({index, exercise: newState}))
  }

  const handleSentencedWordClick = (i: number) => {
    if (sentenceWords) {
      const word = sentenceWords[i]
      const newState = {
        ...exercise,
        assignment: [...shuffledWords, word],
        answer: [...sentenceWords.slice(0, i), ...sentenceWords.slice(i + 1)],
      }

      dispatch(updateExercise({index, exercise: newState}))
    }
  }

  return (
    <>
      <div className="shuffled">
        <Label>Words:</Label>
        <div className="words">
          {shuffledWords.map((word, i) => (
            <Tag large minimal interactive key={i} onClick={() => handleShuffledWordClick(i)}>
              {word}
            </Tag>
          ))}
        </div>
      </div>
      <Label>Sentence:</Label>
      <div className="sentence">
        <div className="words">
          {sentenceWords &&
            sentenceWords.map((word, i) => (
              <Tag large minimal interactive key={i} onClick={() => handleSentencedWordClick(i)}>
                {word}
              </Tag>
            ))}
        </div>
      </div>
    </>
  )
}

export default WordOrderExercise
