import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {TestExerciseState} from '../../types'

type TestState = {
  exercises: Array<TestExerciseState>
}

type TestExercisesUpdatePayload = Array<TestExerciseState>

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
  },
})

export const {setExercises} = test.actions

export default test.reducer
