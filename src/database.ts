import * as firebase from 'firebase/app'
import 'firebase/firestore'

import {firebase as firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()

export default firebase
