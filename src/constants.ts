import WordOrderExercise from './components/exercises/WordOrderExercise'

export enum ExerciseTypes {
  FreeText = 'FREE_TEXT',
  WordOrder = 'WORD_ORDER',
}

export type ExerciseComponentProps = {
  disabled: boolean
}

type ExerciseComponent = (props: ExerciseComponentProps) => JSX.Element

type ExerciseTypeDefinition = {
  name: string
  component: ExerciseComponent | null
}

export const exerciseTypes: Record<ExerciseTypes, ExerciseTypeDefinition> = {
  [ExerciseTypes.FreeText]: {
    name: 'Free Text',
    component: null,
  },
  [ExerciseTypes.WordOrder]: {
    name: 'Word Order',
    component: WordOrderExercise,
  },
}

export const defaultExerciseType = ExerciseTypes.FreeText
