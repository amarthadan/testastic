import {convertToRaw, EditorState} from 'draft-js'

import WordOrderExercise from '../components/exercises/creator/WordOrderExercise'
import ChoiceExercise from '../components/exercises/creator/ChoiceExercise'
import {shuffle} from './common'
import {
  ExerciseTypes,
  CreatorFreeTextExerciseDefinition,
  CreatorWordOrderExerciseDefinition,
  CreatorExerciseState,
  CreatorChoiceExerciseDefinition,
  CreatorGapFillExerciseDefinition,
} from '../types'
import GapFillExercise from '../components/exercises/creator/GapFillExercise'

type Exercises = {
  [ExerciseTypes.FreeText]: CreatorFreeTextExerciseDefinition
  [ExerciseTypes.WordOrder]: CreatorWordOrderExerciseDefinition
  [ExerciseTypes.Choice]: CreatorChoiceExerciseDefinition
  [ExerciseTypes.GapFill]: CreatorGapFillExerciseDefinition
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
  [ExerciseTypes.GapFill]: {
    name: 'Gap Fill',
    component: GapFillExercise,
    emptyState: {
      type: ExerciseTypes.GapFill,
      description: '',
      text: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      answers: {},
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
    case ExerciseTypes.GapFill:
      return exercise.text
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
    case ExerciseTypes.GapFill:
      return exercise.answers
  }
}

export const defaultExerciseType = ExerciseTypes.FreeText
