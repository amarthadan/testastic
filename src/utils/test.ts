import WordOrderExercise from '../components/exercises/test/WordOrderExercise'
import FreeTextExercise from '../components/exercises/test/FreeTextExercise'

import {ExerciseTypes, TestFreeTextExerciseDefinition, TestWordOrderExerciseDefinition} from '../types'

type Exercises = {
  [ExerciseTypes.FreeText]: TestFreeTextExerciseDefinition
  [ExerciseTypes.WordOrder]: TestWordOrderExerciseDefinition
}

export const testExerciseTypes: Exercises = {
  [ExerciseTypes.FreeText]: {
    component: FreeTextExercise,
  },
  [ExerciseTypes.WordOrder]: {
    component: WordOrderExercise,
  },
}
