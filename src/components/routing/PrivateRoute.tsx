import React, {useEffect} from 'react'
import {RouteProps, Route, Redirect, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Navbar, NavbarGroup, Button, Alignment, FormGroup} from '@blueprintjs/core'

import {loggedInSelector, initializedSelector} from '../../redux/selectors/auth'
import {auth} from '../../database'

import './PrivateRoute.scss'

type PrivateRouteProps = RouteProps

const PrivateRoute = ({children, ...rest}: PrivateRouteProps) => {
  const {pathname} = useLocation()
  const dispatch = useDispatch()
  const initialized = useSelector(initializedSelector)
  const loggedIn = useSelector(loggedInSelector)

  const user = auth.currentUser
  const signOut = () => {
    auth.signOut()
  }

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
        (loggedIn ? (
          <>
            <Navbar id="navbar">
              <NavbarGroup align={Alignment.RIGHT}>
                <FormGroup inline label={user?.displayName}>
                  <Button minimal icon="log-out" text="Logout" onClick={signOut} />
                </FormGroup>
              </NavbarGroup>
            </Navbar>
            {children}
          </>
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
