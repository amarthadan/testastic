import WordOrderExercise from '../components/exercises/creator/WordOrderExercise'
import ChoiceExercise from '../components/exercises/creator/ChoiceExercise'
import {shuffle} from './common'
import {
  ExerciseTypes,
  CreatorFreeTextExerciseDefinition,
  CreatorWordOrderExerciseDefinition,
  CreatorExerciseState,
  CreatorChoiceExerciseDefinition,
} from '../types'

type Exercises = {
  [ExerciseTypes.FreeText]: CreatorFreeTextExerciseDefinition
  [ExerciseTypes.WordOrder]: CreatorWordOrderExerciseDefinition
  [ExerciseTypes.Choice]: CreatorChoiceExerciseDefinition
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
  [ExerciseTypes.Choice]: {
    name: 'Choice',
    component: ChoiceExercise,
    emptyState: {
      type: ExerciseTypes.Choice,
      description: '',
      question: '',
      answers: [''],
      correctAnswer: '',
    },
  },
}

export const buildAssignment = (exercise: CreatorExerciseState) => {
  switch (exercise.type) {
    case ExerciseTypes.FreeText:
      return null
    case ExerciseTypes.WordOrder:
      return shuffle(exercise.sentence.split(' '))
    case ExerciseTypes.Choice:
      return {
        question: exercise.question,
        answers: exercise.answers,
      }
  }
}

export const buildAnswer = (exercise: CreatorExerciseState) => {
  switch (exercise.type) {
    case ExerciseTypes.FreeText:
      return null
    case ExerciseTypes.WordOrder:
      return exercise.sentence.split(' ')
    case ExerciseTypes.Choice:
      return exercise.correctAnswer
  }
}

export const defaultExerciseType = ExerciseTypes.FreeText
