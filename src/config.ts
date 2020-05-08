import firebaseDB from './database'
import * as firebaseui from 'firebaseui'

export const firebase =
  process.env.REACT_APP_FIREBASE_ENV === 'production'
    ? {
        apiKey: 'AIzaSyB9FOgmnux53_L5NLARM03Dl2Cn_j7VYAk',
        authDomain: 'testastic-9508b.firebaseapp.com',
        databaseURL: 'https://testastic-9508b.firebaseio.com',
        projectId: 'testastic-9508b',
        storageBucket: 'testastic-9508b.appspot.com',
        messagingSenderId: '103406953022',
        appId: '1:103406953022:web:f4e51c60a18c437e71a76f',
      }
    : {
        apiKey: 'AIzaSyCtwqma5Vmb5xCYAusq1o2_7M9qtiT686o',
        authDomain: 'testastic-staging.firebaseapp.com',
        databaseURL: 'https://testastic-staging.firebaseio.com',
        projectId: 'testastic-staging',
        storageBucket: 'testastic-staging.appspot.com',
        messagingSenderId: '426164012322',
        appId: '1:426164012322:web:e6724fd76e40f39b07517b',
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
