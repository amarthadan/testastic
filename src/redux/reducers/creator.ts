import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RawDraftContentState} from 'draft-js'

import {defaultExerciseType, creatorExerciseTypes} from '../../utils/creator'
import {CreatorExerciseState, ExerciseTypes} from '../../types'

type CreatorState = {
  exercises: Array<CreatorExerciseState>
}

type CreatorExerciseUpdatePayloadCommon = {
  index: number
}

type CreatorExerciseUpdateTypePayload = {
  type: ExerciseTypes
} & CreatorExerciseUpdatePayloadCommon

type CreatorExerciseUpdateDescriptionPayload = {
  description: RawDraftContentState
} & CreatorExerciseUpdatePayloadCommon

type CreatorExerciseUpdatePayload = {
  exercise: CreatorExerciseState
} & CreatorExerciseUpdatePayloadCommon

const initialState: CreatorState = {
  exercises: [],
}

const creator = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    addExercise(state) {
      state.exercises.push(creatorExerciseTypes[defaultExerciseType].emptyState)
    },
    removeExercise(state, action: PayloadAction<number>) {
      state.exercises.splice(action.payload, 1)
    },
    updateExercise(state, action: PayloadAction<CreatorExerciseUpdatePayload>) {
      state.exercises[action.payload.index] = action.payload.exercise
    },
    updateExerciseType(state, action: PayloadAction<CreatorExerciseUpdateTypePayload>) {
      state.exercises[action.payload.index] = creatorExerciseTypes[action.payload.type].emptyState
    },
    updateExerciseDescription(state, action: PayloadAction<CreatorExerciseUpdateDescriptionPayload>) {
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
