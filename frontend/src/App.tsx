import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Navigation } from './components/Navigation';
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

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/bootcamp" component={BootcampPage} />
          <Route exact path="/bootcamps" component={BootcampsPage} />
          <Route exact path="/bootcamp-application-form" component={BootcampApplicationFormPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/change-password" component={ChangePasswordPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
    </Router>
  )
}

export default App;
