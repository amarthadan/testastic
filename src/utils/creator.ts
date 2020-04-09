import WordOrderExercise from '../components/exercises/creator/WordOrderExercise'
import {shuffle} from './common'
import {
  ExerciseTypes,
  CreatorFreeTextExerciseDefinition,
  CreatorWordOrderExerciseDefinition,
  CreatorExerciseState,
} from '../types'

type Exercises = {
  [ExerciseTypes.FreeText]: CreatorFreeTextExerciseDefinition
  [ExerciseTypes.WordOrder]: CreatorWordOrderExerciseDefinition
}

// TODO: come up with better solution

// const empty = () => null

export const creatorExerciseTypes: Exercises = {
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

export const buildAssignment = (exercise: CreatorExerciseState) => {
  switch (exercise.type) {
    case ExerciseTypes.FreeText:
      return null
    case ExerciseTypes.WordOrder:
      return shuffle(exercise.sentence.split(' '))
  }
}

export const buildAnswer = (exercise: CreatorExerciseState) => {
  switch (exercise.type) {
    case ExerciseTypes.FreeText:
      return null
    case ExerciseTypes.WordOrder:
      return exercise.sentence.split(' ')
  }
}

export const defaultExerciseType = ExerciseTypes.FreeText
