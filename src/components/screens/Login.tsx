import React, {useEffect, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {H1} from '@blueprintjs/core'

import {loggedInSelector, initializedSelector} from '../../redux/selectors/auth'
import {auth as authConfig} from '../../config'
import {authUI} from '../../database'

import './Login.scss'

const Login = () => {
  const initialized = useSelector(initializedSelector)
  const loggedIn = useSelector(loggedInSelector)

  const signInSuccessWithAuthResult = useCallback(() => {
    const redirect = sessionStorage.getItem('redirectUrl') || window.location.origin
    window.location.replace(redirect)

    return false
  }, [])

  useEffect(() => {
    if (initialized && !loggedIn) {
      const uiConfig = authConfig(signInSuccessWithAuthResult)
      authUI.start('#firebaseui-auth', uiConfig)
    }
  }, [initialized, loggedIn, signInSuccessWithAuthResult])

  return (
    <div className="login">
      <H1>Login</H1>
      <div id="firebaseui-auth" />
    </div>
  )
}

export default Login
