import {combineReducers} from '@reduxjs/toolkit'

import creatorReducer from './creator'
import testReducer from './test'

const rootReducer = combineReducers({
  creator: creatorReducer,
  test: testReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
