import {useEffect} from 'react'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import {firebase as firebaseConfig} from '../config'
import {Collections} from '../types'

export const useInitDB = () => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
  }, [])
}

export const useCollection = (collection: Collections) => {
  const db = firebase.firestore()

  return db.collection(collection)
}
