import WordOrderExercise from '../components/exercises/WordOrderExercise'
import {shuffle} from './common'
import {ExerciseTypes, FreeTextExerciseDefinition, WordOrderExerciseDefinition, ExerciseState} from '../types'

type Exercises = {
  [ExerciseTypes.FreeText]: FreeTextExerciseDefinition
  [ExerciseTypes.WordOrder]: WordOrderExerciseDefinition
}

// TODO: come up with better solution

// const empty = () => null

export const exerciseTypes: Exercises = {
  [ExerciseTypes.FreeText]: {
    name: 'Free Text',
    component: null,
    emptyState: {
      type: ExerciseTypes.FreeText,
      description: '',
    },
    // assignment: empty,
    // answer: empty,
  },
  [ExerciseTypes.WordOrder]: {
    name: 'Word Order',
    component: WordOrderExercise,
    emptyState: {
      type: ExerciseTypes.WordOrder,
      description: '',
      sentence: '',
    },
    // assignment: (exercise) => shuffle(exercise.sentence.split(' ')),
    // answer: (exercise) => exercise.sentence.split(' '),
  },
}

export const buildAssignment = (exercise: ExerciseState) => {
  switch (exercise.type) {
    case ExerciseTypes.FreeText:
      return null
    case ExerciseTypes.WordOrder:
      return shuffle(exercise.sentence.split(' '))
  }
}

export const buildAnswer = (exercise: ExerciseState) => {
  switch (exercise.type) {
    case ExerciseTypes.FreeText:
      return null
    case ExerciseTypes.WordOrder:
      return exercise.sentence.split(' ')
  }
}

export const defaultExerciseType = ExerciseTypes.FreeText
