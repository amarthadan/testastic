// TODO: proper typing - bind exercise type with exercise specific properties

import {RawDraftContentState} from 'draft-js'

export enum ExerciseTypes {
  FreeText = 'FREE_TEXT',
  WordOrder = 'WORD_ORDER',
  Choice = 'CHOICE',
  GapFill = 'GAP_FILL',
}

export interface CreatorSpecificExerciseComponentProps {
  index: number
}

interface CreatorSpecificExerciseComponent {
  (props: CreatorSpecificExerciseComponentProps): JSX.Element
}

interface CreatorExerciseStateCommon {
  description?: RawDraftContentState
}

type CreatorFreeTextExerciseState = {
  type: ExerciseTypes.FreeText
} & CreatorExerciseStateCommon

export type CreatorWordOrderExerciseState = {
  type: ExerciseTypes.WordOrder
  sentence: string
} & CreatorExerciseStateCommon

export type CreatorChoiceExerciseState = {
  type: ExerciseTypes.Choice
  question: string
  answers: Array<string>
  correctAnswer: string
} & CreatorExerciseStateCommon

export type CreatorGapFillExerciseState = {
  type: ExerciseTypes.GapFill
  text: RawDraftContentState
  answers: Record<string, string>
} & CreatorExerciseStateCommon

export type CreatorExerciseState =
  | CreatorFreeTextExerciseState
  | CreatorWordOrderExerciseState
  | CreatorChoiceExerciseState
  | CreatorGapFillExerciseState

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

export type CreatorChoiceExerciseDefinition = {
  emptyState: CreatorChoiceExerciseState
} & CreatorExerciseDefinitionCommon

export type CreatorGapFillExerciseDefinition = {
  emptyState: CreatorGapFillExerciseState
} & CreatorExerciseDefinitionCommon

export enum Collections {
  Tests = 'tests',
  Exercises = 'exercises',
  CorrectAnswers = 'correctAnswers',
  Answers = 'answers',
}

interface TestExerciseStateCommon {
  id: string
  description: RawDraftContentState
}

export type TestFreeTextExerciseState = {
  type: ExerciseTypes.FreeText
  assignment: null
  answer?: RawDraftContentState
} & TestExerciseStateCommon

export type TestWordOrderExerciseState = {
  type: ExerciseTypes.WordOrder
  assignment: Array<string>
  answer?: Array<string>
} & TestExerciseStateCommon

type TestChoiceExerciseStateAssignment = {
  question: string
  answers: Array<string>
}

export type TestChoiceExerciseState = {
  type: ExerciseTypes.Choice
  assignment: TestChoiceExerciseStateAssignment
  answer?: string
} & TestExerciseStateCommon

export type TestGapFillExerciseState = {
  type: ExerciseTypes.GapFill
  assignment: RawDraftContentState
  answer?: Record<string, string>
} & TestExerciseStateCommon

export type TestExerciseState =
  | TestFreeTextExerciseState
  | TestWordOrderExerciseState
  | TestChoiceExerciseState
  | TestGapFillExerciseState

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

export type TestChoiceExerciseDefinition = TestExerciseDefinitionCommon

export type TestGapFillExerciseDefinition = TestExerciseDefinitionCommon

type ResultExerciseStateCommon = {
  description: RawDraftContentState
}

export type ResultFreeTextExerciseState = {
  type: ExerciseTypes.FreeText
  assignment: null
  answer?: RawDraftContentState
} & ResultExerciseStateCommon

export type ResultWordOrderExerciseState = {
  type: ExerciseTypes.WordOrder
  assignment: Array<string>
  answer?: Array<string>
  correctAnswer: Array<string>
} & ResultExerciseStateCommon

export type ResultChoiceExerciseState = {
  type: ExerciseTypes.Choice
  assignment: TestChoiceExerciseStateAssignment
  answer?: string
  correctAnswer: string
} & ResultExerciseStateCommon

export type ResultGapFillExerciseState = {
  type: ExerciseTypes.GapFill
  assignment: RawDraftContentState
  answer?: Record<string, string>
  correctAnswer: Record<string, string>
} & ResultExerciseStateCommon

export type ResultExerciseState =
  | ResultFreeTextExerciseState
  | ResultWordOrderExerciseState
  | ResultChoiceExerciseState
  | ResultGapFillExerciseState
