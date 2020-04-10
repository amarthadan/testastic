/* eslint-disable react/display-name */
import React from 'react'

import FreeTextExercise from '../components/exercises/result/FreeTextExercise'
import WordOrderExercise from '../components/exercises/result/WordOrderExercise'
import {ResultExerciseState, ExerciseTypes} from '../types'

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
  }
}
