import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FormGroup, InputGroup, Radio, Button} from '@blueprintjs/core'

import {exerciseSelector} from '../../../redux/selectors/creator'
import {CreatorSpecificExerciseComponentProps, CreatorChoiceExerciseState} from '../../../types'
import {RootState} from '../../../redux/reducers/root'
import {updateExercise} from '../../../redux/reducers/creator'

import './ChoiceExercise.scss'

type AnswerGroupProps = {
  index: number
  answer: string
  selectedAnswer: string
  onAnswerSelect: (answer: string) => void
  onAnswerChange: (answer: string, index: number) => void
  onRemoveClick: (index: number) => void
}

const AnswerGroup = ({
  index,
  answer,
  selectedAnswer,
  onAnswerChange,
  onAnswerSelect,
  onRemoveClick,
}: AnswerGroupProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value
    onAnswerChange(newAnswer, index)
  }

  const handleRadioChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newSelectedAnswer = event.currentTarget.value
    onAnswerSelect(newSelectedAnswer)
  }

  return (
    <div className="answer-group">
      <InputGroup value={answer} onChange={handleInputChange} className="input" />
      <Radio value={answer} checked={answer === selectedAnswer} onChange={handleRadioChange} className="radio" />
      <Button minimal intent="danger" icon="trash" onClick={() => onRemoveClick(index)} />
    </div>
  )
}

const ChoiceExercise = ({index}: CreatorSpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as CreatorChoiceExerciseState

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateExercise({index, exercise: {...exercise, question: event.target.value}}))
  }

  const handleAnswerChange = (answer: string, i: number) => {
    const answers = exercise.answers.slice()
    const correctAnswer = exercise.correctAnswer === answers[i] ? answer : exercise.correctAnswer
    answers[i] = answer
    dispatch(updateExercise({index, exercise: {...exercise, correctAnswer, answers}}))
  }

  const handleAnswerSelect = (answer: string) => {
    dispatch(updateExercise({index, exercise: {...exercise, correctAnswer: answer}}))
  }

  const addAnswer = () => {
    const answers = exercise.answers.slice()
    answers.push('')
    dispatch(updateExercise({index, exercise: {...exercise, answers}}))
  }

  const removeAnswer = (i: number) => {
    const removedAnswer = exercise.answers[i]
    const answers = [...exercise.answers.slice(0, i), ...exercise.answers.slice(i + 1)]
    const correctAnswer = exercise.correctAnswer === removedAnswer ? exercise.answers[0] : exercise.correctAnswer
    dispatch(updateExercise({index, exercise: {...exercise, correctAnswer, answers}}))
  }

  return (
    <>
      <FormGroup label="Question:" inline contentClassName="question-input">
        <InputGroup fill onChange={handleQuestionChange} />
      </FormGroup>

      <FormGroup label="Answers:" inline>
        <Button minimal intent="primary" icon="add" className="add-button" onClick={addAnswer} />
      </FormGroup>

      {exercise.answers.map((answer, index) => (
        <AnswerGroup
          key={index}
          index={index}
          answer={answer}
          selectedAnswer={exercise.correctAnswer}
          onAnswerChange={handleAnswerChange}
          onAnswerSelect={handleAnswerSelect}
          onRemoveClick={removeAnswer}
        />
      ))}
    </>
  )
}

export default ChoiceExercise
