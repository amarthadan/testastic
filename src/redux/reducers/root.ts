import {combineReducers} from '@reduxjs/toolkit'

import creatorReducer from './creator'
import testReducer from './test'
import authReducer from './auth'

const rootReducer = combineReducers({
  creator: creatorReducer,
  test: testReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
