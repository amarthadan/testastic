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

interface ExerciseStateCommon {
  description: string
}

type FreeTextExerciseState = {
  type: ExerciseTypes.FreeText
} & ExerciseStateCommon

export type WordOrderExerciseState = {
  type: ExerciseTypes.WordOrder
  sentence: string
} & ExerciseStateCommon

export type ExerciseState = FreeTextExerciseState | WordOrderExerciseState

interface ExerciseDefinitionCommon {
  name: string
  component: SpecificExerciseComponent | null
}

// interface FreeTextExerciseAssignment {
//   (exercise: FreeTextExerciseState): null
// }

// interface FreeTextExerciseAnswer {
//   (exercise: FreeTextExerciseState): null
// }

export type FreeTextExerciseDefinition = {
  emptyState: FreeTextExerciseState
  // assignment: FreeTextExerciseAssignment
  // answer: FreeTextExerciseAnswer
} & ExerciseDefinitionCommon

// interface WordOrderExerciseAssignment {
//   (exercise: WordOrderExerciseState): Array<string>
// }

// interface WordOrderExerciseAnswer {
//   (exercise: WordOrderExerciseState): Array<string>
// }

export type WordOrderExerciseDefinition = {
  emptyState: WordOrderExerciseState
  // assignment: WordOrderExerciseAssignment
  // answer: WordOrderExerciseAnswer
} & ExerciseDefinitionCommon
