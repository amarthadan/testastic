import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type AuthState = {
  initialized: boolean
  loggedIn: boolean
  redirectAfterLogin: string
}

type UpdateLoggedInPayload = boolean
type UpdateInitializedPayload = boolean

const initialState: AuthState = {
  initialized: false,
  loggedIn: false,
  redirectAfterLogin: '/',
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<UpdateLoggedInPayload>) {
      state.loggedIn = action.payload
    },
    setInitialized(state, action: PayloadAction<UpdateInitializedPayload>) {
      state.initialized = action.payload
    },
  },
})

export const {setLoggedIn, setInitialized} = auth.actions

export default auth.reducer
