/* eslint-disable react/display-name */
import React from 'react'

import FreeTextExercise from '../components/exercises/result/FreeTextExercise'
import WordOrderExercise from '../components/exercises/result/WordOrderExercise'
import {ResultExerciseState, ExerciseTypes} from '../types'
import ChoiceExercise from '../components/exercises/result/ChoiceExercise'

export const specificExercise = (exercise: ResultExerciseState) => {
  switch (exercise.type) {
    case ExerciseTypes.FreeText:
      return () => (
        <FreeTextExercise
          type={exercise.type}
          description={exercise.description}
          assignment={exercise.assignment}
          answer={exercise.answer}
        />
      )
    case ExerciseTypes.WordOrder:
      return () => (
        <WordOrderExercise
          type={exercise.type}
          description={exercise.description}
          assignment={exercise.assignment}
          answer={exercise.answer}
          correctAnswer={exercise.correctAnswer}
        />
      )
    case ExerciseTypes.Choice:
      return () => (
        <ChoiceExercise
          type={exercise.type}
          description={exercise.description}
          assignment={exercise.assignment}
          answer={exercise.answer}
          correctAnswer={exercise.correctAnswer}
        />
      )
  }
}
