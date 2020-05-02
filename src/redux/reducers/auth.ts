import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type AuthState = {
  initialized: boolean
  loggedIn: boolean
  verified: boolean
}

type UpdateLoggedInPayload = boolean
type UpdateInitializedPayload = boolean
type UpdateVerifiedPayload = boolean

const initialState: AuthState = {
  initialized: false,
  loggedIn: false,
  verified: false,
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
    setVerified(state, action: PayloadAction<UpdateInitializedPayload>) {
      state.verified = action.payload
    },
  },
})

export const {setLoggedIn, setInitialized, setVerified} = auth.actions

export default auth.reducer
