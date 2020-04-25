import {RootState} from '../reducers/root'

export const loggedInSelector = (state: RootState) => state.auth.loggedIn
export const initializedSelector = (state: RootState) => state.auth.initialized
