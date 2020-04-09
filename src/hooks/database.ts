import * as firebase from 'firebase/app'
import 'firebase/firestore'

import {firebase as firebaseConfig} from '../config'
import {Collections} from '../types'

// TODO: Not very good hooks. Maybe put inside useEffect?
export const useInitDB = () => {
  firebase.initializeApp(firebaseConfig)
}

export const useCollection = (collection: Collections) => {
  const db = firebase.firestore()

  return db.collection(collection)
}
