import WordOrderExercise from '../components/exercises/test/WordOrderExercise'
import FreeTextExercise from '../components/exercises/test/FreeTextExercise'
import ChoiceExercise from '../components/exercises/test/ChoiceExercise'

import {
  ExerciseTypes,
  TestFreeTextExerciseDefinition,
  TestWordOrderExerciseDefinition,
  TestChoiceExerciseDefinition,
  TestGapFillExerciseDefinition,
} from '../types'
import GapFillExercise from '../components/exercises/test/GapFillExercise'

type Exercises = {
  [ExerciseTypes.FreeText]: TestFreeTextExerciseDefinition
  [ExerciseTypes.WordOrder]: TestWordOrderExerciseDefinition
  [ExerciseTypes.Choice]: TestChoiceExerciseDefinition
  [ExerciseTypes.GapFill]: TestGapFillExerciseDefinition
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
  [ExerciseTypes.GapFill]: {
    component: GapFillExercise,
  },
}
