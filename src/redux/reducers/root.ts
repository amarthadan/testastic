import {combineReducers} from '@reduxjs/toolkit'

import creatorReducer from './creator'

const rootReducer = combineReducers({
  creator: creatorReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
