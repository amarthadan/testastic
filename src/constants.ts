import WordOrderExercise from './components/exercises/WordOrderExercise'
import {ExerciseTypeDefinition, ExerciseTypes} from './types'

export const exerciseTypes: Record<ExerciseTypes, ExerciseTypeDefinition> = {
  [ExerciseTypes.FreeText]: {
    name: 'Free Text',
    component: null,
    emptyState: {
      type: ExerciseTypes.FreeText,
      description: '',
    },
  },
  [ExerciseTypes.WordOrder]: {
    name: 'Word Order',
    component: WordOrderExercise,
    emptyState: {
      type: ExerciseTypes.WordOrder,
      description: '',
      sentence: '',
    },
  },
}

export const defaultExerciseType = ExerciseTypes.FreeText
