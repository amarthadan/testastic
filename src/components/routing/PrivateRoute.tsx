import React, {useEffect} from 'react'
import {RouteProps, Route, Redirect, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {loggedInSelector, initializedSelector, verifiedSelector} from '../../redux/selectors/auth'

import './PrivateRoute.scss'

type PrivateRouteProps = RouteProps

const PrivateRoute = ({children, ...rest}: PrivateRouteProps) => {
  const {pathname} = useLocation()
  const dispatch = useDispatch()
  const initialized = useSelector(initializedSelector)
  const loggedIn = useSelector(loggedInSelector)
  const verified = useSelector(verifiedSelector)

  useEffect(() => {
    if (initialized && !loggedIn) {
      sessionStorage.setItem('redirectUrl', `${window.location.origin}${pathname}`)
    }
  }, [dispatch, initialized, loggedIn, pathname])

  return (
    <Route
      {...rest}
      render={() =>
        initialized &&
        (loggedIn && verified ? (
          <>{children}</>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        ))
      }
    />
  )
}

export default PrivateRoute
