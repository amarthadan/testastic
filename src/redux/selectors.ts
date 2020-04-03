import {createSelector} from '@reduxjs/toolkit'

import {RootState} from './reducers/root'

export const exercisesSelector = (state: RootState) => state.creator.exercises

export const exerciseSelector = createSelector(
  exercisesSelector,
  (state: RootState, index: number) => index,
  (exercises, index) => exercises[index],
)
