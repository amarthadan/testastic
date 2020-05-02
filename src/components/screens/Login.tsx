import React, {useEffect, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {H1, Button, Intent, ButtonGroup} from '@blueprintjs/core'

import {loggedInSelector, initializedSelector, verifiedSelector} from '../../redux/selectors/auth'
import {auth as authConfig} from '../../config'
import {authUI, auth} from '../../database'

import './Login.scss'
import {Redirect} from 'react-router-dom'

const Login = () => {
  const redirect = sessionStorage.getItem('redirectUrl') || window.location.origin
  const initialized = useSelector(initializedSelector)
  const loggedIn = useSelector(loggedInSelector)
  const verified = useSelector(verifiedSelector)
  const user = auth.currentUser

  const signInSuccessWithAuthResult = useCallback((authResult) => {
    if (
      authResult.user.metadata.creationTime === authResult.user.metadata.lastSignInTime &&
      !authResult.user.emailVerified
    ) {
      authResult.user.sendEmailVerification()
    }

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
      {loggedIn &&
        (verified ? (
          <Redirect to={new URL(redirect).pathname} />
        ) : (
          <>
            <p>You have to verify your account first. Verification email was sent to {user?.email}</p>
            <ButtonGroup>
              <Button intent={Intent.PRIMARY} onClick={() => user?.sendEmailVerification()}>
                Resend
              </Button>
            </ButtonGroup>
          </>
        ))}
    </div>
  )
}

export default Login
