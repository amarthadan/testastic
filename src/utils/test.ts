import WordOrderExercise from '../components/exercises/test/WordOrderExercise'
import FreeTextExercise from '../components/exercises/test/FreeTextExercise'
import ChoiceExercise from '../components/exercises/test/ChoiceExercise'

import {
  ExerciseTypes,
  TestFreeTextExerciseDefinition,
  TestWordOrderExerciseDefinition,
  TestChoiceExerciseDefinition,
} from '../types'

type Exercises = {
  [ExerciseTypes.FreeText]: TestFreeTextExerciseDefinition
  [ExerciseTypes.WordOrder]: TestWordOrderExerciseDefinition
  [ExerciseTypes.Choice]: TestChoiceExerciseDefinition
}

export const testExerciseTypes: Exercises = {
  [ExerciseTypes.FreeText]: {
    component: FreeTextExercise,
  },
  [ExerciseTypes.WordOrder]: {
    component: WordOrderExercise,
  },
  [ExerciseTypes.Choice]: {
    component: ChoiceExercise,
  },
}
