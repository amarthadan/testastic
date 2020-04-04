import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {defaultExerciseType, exerciseTypes} from '../../constants'
import {Exercise, ExerciseTypes} from '../../types'

type CreatorState = {
  exercises: Array<Exercise>
}

type ExerciseUpdatePayloadCommon = {
  index: number
}

type ExerciseUpdateTypePayload = {
  type: ExerciseTypes
} & ExerciseUpdatePayloadCommon

type ExerciseUpdateDescriptionPayload = {
  description: string
} & ExerciseUpdatePayloadCommon

type ExerciseUpdatePayload = {
  exercise: Exercise
} & ExerciseUpdatePayloadCommon

const initialState: CreatorState = {
  exercises: [],
}

const creator = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    addExercise(state) {
      state.exercises.push(exerciseTypes[defaultExerciseType].emptyState)
    },
    removeExercise(state, action: PayloadAction<number>) {
      state.exercises.splice(action.payload, 1)
    },
    updateExercise(state, action: PayloadAction<ExerciseUpdatePayload>) {
      state.exercises[action.payload.index] = action.payload.exercise
    },
    updateExerciseType(state, action: PayloadAction<ExerciseUpdateTypePayload>) {
      state.exercises[action.payload.index] = exerciseTypes[action.payload.type].emptyState
    },
    updateExerciseDescription(state, action: PayloadAction<ExerciseUpdateDescriptionPayload>) {
      state.exercises[action.payload.index].description = action.payload.description
    },
  },
})

export const {
  addExercise,
  removeExercise,
  updateExercise,
  updateExerciseType,
  updateExerciseDescription,
} = creator.actions

export default creator.reducer
