import firebaseDB from './database'

export const firebase = {
  apiKey: 'AIzaSyB9FOgmnux53_L5NLARM03Dl2Cn_j7VYAk',
  authDomain: 'testastic-9508b.firebaseapp.com',
  databaseURL: 'https://testastic-9508b.firebaseio.com',
  projectId: 'testastic-9508b',
  storageBucket: 'testastic-9508b.appspot.com',
  messagingSenderId: '103406953022',
  appId: '1:103406953022:web:f4e51c60a18c437e71a76f',
}

type SignInSuccessWithAuthResult = () => boolean

export const auth = (signInSuccessWithAuthResult: SignInSuccessWithAuthResult) => {
  return {
    callbacks: {
      signInSuccessWithAuthResult,
    },
    signInOptions: [
      // List of OAuth providers supported.
      firebaseDB.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  }
}
