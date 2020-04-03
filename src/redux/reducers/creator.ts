import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {ExerciseTypes, defaultExerciseType} from '../../constants'

type ExerciseCommon = {
  type: ExerciseTypes
  description: string
}

type FreeTextExercise = ExerciseCommon

type WordOrderExercise = {
  sentence: string
} & ExerciseCommon

type Exercise = FreeTextExercise | WordOrderExercise

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

const initialState: CreatorState = {
  exercises: [],
}

const defultExercise: Exercise = {
  type: defaultExerciseType,
  description: '',
}

const creator = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    addExercise(state) {
      state.exercises.push(defultExercise)
    },
    removeExercise(state, action: PayloadAction<number>) {
      state.exercises.splice(action.payload, 1)
    },
    updateExerciseType(state, action: PayloadAction<ExerciseUpdateTypePayload>) {
      state.exercises[action.payload.index].type = action.payload.type
    },
    updateExerciseDescription(state, action: PayloadAction<ExerciseUpdateDescriptionPayload>) {
      state.exercises[action.payload.index].description = action.payload.description
    },
  },
})

export const {addExercise, removeExercise, updateExerciseType, updateExerciseDescription} = creator.actions

export default creator.reducer
