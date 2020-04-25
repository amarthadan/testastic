import * as firebase from 'firebase/app'
import 'firebase/firestore'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import {firebase as firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const authUI = new firebaseui.auth.AuthUI(firebase.auth())

export default firebase
