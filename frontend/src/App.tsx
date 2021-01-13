import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { signInWithCookies as SignInData } from './lib/graphql/mutations/SignInWithCookies/__generated__/signInWithCookies';
import { SIGN_IN_WITH_COOKIES } from './lib/graphql/mutations';
import { Navigation } from './components';
import { useSetLoggedInUserId, useLoggedInUserId } from './hooks';
import {
  BootcampPage,
  BootcampsPage, 
  HomePage, 
  ForgotPasswordPage,
  ChangePasswordPage,
  SignInPage,
  SignUpPage,
  SearchPage,
  BootcampApplicationFormPage,
  ProfilePage
} from './pages';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/bootcamp" component={BootcampPage} />
    <Route exact path="/bootcamps" component={BootcampsPage} />
    <Route exact path="/bootcamp-application-form" component={BootcampApplicationFormPage} />
    <Route exact path="/search" component={SearchPage} />
    <Route exact path="/profile" component={ProfilePage} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/bootcamp" component={BootcampPage} />
    <Route exact path="/bootcamps" component={BootcampsPage} />
    <Route exact path="/bootcamp-application-form" component={BootcampApplicationFormPage} />
    <Route exact path="/search" component={SearchPage} />
    <Route exact path="/login" component={SignInPage} />
    <Route exact path="/signup" component={SignUpPage} />
    <Route exact path="/forgot-password" component={ForgotPasswordPage} />
    <Route exact path="/change-password" component={ChangePasswordPage} />
  </Switch>
);

const App = () => {
  const setLoggedInUserId = useSetLoggedInUserId();
  const loggedInUserId = useLoggedInUserId();
  const [signIn] = useMutation<SignInData>(SIGN_IN_WITH_COOKIES, {
    onCompleted: (data) => {
      if (data && data.signInWithCookies) {
        setLoggedInUserId(data.signInWithCookies.id);
        if (data.signInWithCookies.token) {
          sessionStorage.setItem("token", data.signInWithCookies.token.toString());
        } else {
          sessionStorage.removeItem("token");
        }
      }
    }
  });

  const signInRef = useRef(signIn);

  useEffect(() => {
    signInRef.current();
  }, []);

  return (
    <Router>
      <Navigation />
      <Container>
        {
          loggedInUserId !== null ? (
            <LoggedInRoutes />
          ) : (
            <LoggedOutRoutes />
          )
        }
      </Container>
    </Router>
  )
}

export default App;
