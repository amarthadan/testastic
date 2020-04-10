// TODO: proper typing - bind exercise type with exercise specific properties

export enum ExerciseTypes {
  FreeText = 'FREE_TEXT',
  WordOrder = 'WORD_ORDER',
}

export interface CreatorSpecificExerciseComponentProps {
  index: number
  disabled: boolean
}

interface CreatorSpecificExerciseComponent {
  (props: CreatorSpecificExerciseComponentProps): JSX.Element
}

interface CreatorExerciseStateCommon {
  description: string
}

type CreatorFreeTextExerciseState = {
  type: ExerciseTypes.FreeText
} & CreatorExerciseStateCommon

export type CreatorWordOrderExerciseState = {
  type: ExerciseTypes.WordOrder
  sentence: string
} & CreatorExerciseStateCommon

export type CreatorExerciseState = CreatorFreeTextExerciseState | CreatorWordOrderExerciseState

interface CreatorExerciseDefinitionCommon {
  name: string
  component: CreatorSpecificExerciseComponent | null
}

// interface FreeTextExerciseAssignment {
//   (exercise: FreeTextExerciseState): null
// }

// interface FreeTextExerciseAnswer {
//   (exercise: FreeTextExerciseState): null
// }

export type CreatorFreeTextExerciseDefinition = {
  emptyState: CreatorFreeTextExerciseState
  // assignment: FreeTextExerciseAssignment
  // answer: FreeTextExerciseAnswer
} & CreatorExerciseDefinitionCommon

// interface WordOrderExerciseAssignment {
//   (exercise: WordOrderExerciseState): Array<string>
// }

// interface WordOrderExerciseAnswer {
//   (exercise: WordOrderExerciseState): Array<string>
// }

export type CreatorWordOrderExerciseDefinition = {
  emptyState: CreatorWordOrderExerciseState
  // assignment: WordOrderExerciseAssignment
  // answer: WordOrderExerciseAnswer
} & CreatorExerciseDefinitionCommon

export enum Collections {
  Tests = 'tests',
  Exercises = 'exercises',
  CorrectAnswers = 'correctAnswers',
  Answers = 'answers',
}

interface TestExerciseStateCommon {
  id: string
  description: string
}

export type TestFreeTextExerciseState = {
  type: ExerciseTypes.FreeText
  assignment: null
  answer?: string
} & TestExerciseStateCommon

export type TestWordOrderExerciseState = {
  type: ExerciseTypes.WordOrder
  assignment: Array<string>
  answer?: Array<string>
} & TestExerciseStateCommon

export type TestExerciseState = TestFreeTextExerciseState | TestWordOrderExerciseState

export interface TestSpecificExerciseComponentProps {
  index: number
}

interface TestSpecificExerciseComponent {
  (props: TestSpecificExerciseComponentProps): JSX.Element
}

interface TestExerciseDefinitionCommon {
  component: TestSpecificExerciseComponent
}

export type TestFreeTextExerciseDefinition = TestExerciseDefinitionCommon

export type TestWordOrderExerciseDefinition = TestExerciseDefinitionCommon

type ResultExerciseStateCommon = {
  description: string
}

export type ResultFreeTextExerciseState = {
  type: ExerciseTypes.FreeText
  assignment: null
  answer?: string
} & ResultExerciseStateCommon

export type ResultWordOrderExerciseState = {
  type: ExerciseTypes.WordOrder
  assignment: Array<string>
  answer?: Array<string>
  correctAnswer: Array<string>
} & ResultExerciseStateCommon

export type ResultExerciseState = ResultFreeTextExerciseState | ResultWordOrderExerciseState
