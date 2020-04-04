// TODO: proper typing - bind exercise type with exercise specific properties

export enum ExerciseTypes {
  FreeText = 'FREE_TEXT',
  WordOrder = 'WORD_ORDER',
}

export interface SpecificExerciseComponentProps {
  index: number
  disabled: boolean
}

interface SpecificExerciseComponent {
  (props: SpecificExerciseComponentProps): JSX.Element
}

export interface ExerciseTypeDefinition {
  name: string
  component: SpecificExerciseComponent | null
  emptyState: Exercise
}

interface ExerciseCommon {
  type: ExerciseTypes
  description: string
}

type FreeTextExercise = ExerciseCommon

type WordOrderExercise = {
  sentence: string
} & ExerciseCommon

export type Exercise = FreeTextExercise | WordOrderExercise
