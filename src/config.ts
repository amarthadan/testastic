import firebaseDB from './database'
import * as firebaseui from 'firebaseui'

export const firebase = {
  apiKey: 'AIzaSyB9FOgmnux53_L5NLARM03Dl2Cn_j7VYAk',
  authDomain: 'testastic-9508b.firebaseapp.com',
  databaseURL: 'https://testastic-9508b.firebaseio.com',
  projectId: 'testastic-9508b',
  storageBucket: 'testastic-9508b.appspot.com',
  messagingSenderId: '103406953022',
  appId: '1:103406953022:web:f4e51c60a18c437e71a76f',
}

type SignInSuccessWithAuthResult = (authResult: unknown) => boolean

export const auth = (signInSuccessWithAuthResult: SignInSuccessWithAuthResult) => {
  return {
    callbacks: {
      signInSuccessWithAuthResult,
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // List of OAuth providers supported.
      firebaseDB.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebaseDB.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
        signInMethod: 'password',
      },
    ],
  }
}
