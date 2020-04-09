import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {TestExerciseState} from '../../types'

type TestState = {
  exercises: Array<TestExerciseState>
}

type TestExercisesUpdatePayload = Array<TestExerciseState>

type TestExerciseUpdatePayload = {
  index: number
  exercise: TestExerciseState
}

const initialState: TestState = {
  exercises: [],
}

const test = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setExercises(state, action: PayloadAction<TestExercisesUpdatePayload>) {
      state.exercises = action.payload
    },
    updateExercise(state, action: PayloadAction<TestExerciseUpdatePayload>) {
      state.exercises[action.payload.index] = action.payload.exercise
    },
  },
})

export const {setExercises, updateExercise} = test.actions

export default test.reducer
