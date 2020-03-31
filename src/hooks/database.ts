import {useEffect} from 'react'
import * as firebase from 'firebase/app'

import {firebase as firebaseConfig} from '../config'

export const useInitDB = () => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
  }, [])
}
