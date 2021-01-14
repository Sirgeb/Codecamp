import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CodeIcon from '@material-ui/icons/Code';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FORGOT_PASSWORD } from '../../../lib/graphql/mutations';
import { forgotPassword as ForgotPasswordData, forgotPasswordVariables as ForgotPasswordVariables } from '../../../lib/graphql/mutations/ForgotPassword/__generated__/forgotPassword';
import { Copyright, Alert, Backdroper } from '../../';

export const ForgotPasswordForm = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [forgotPassword, { loading, error }] = useMutation<ForgotPasswordData, ForgotPasswordVariables>(FORGOT_PASSWORD, {
    onCompleted: (data) => {
      if (data.forgotPassword && !error) {
        setSuccess(true);
      }
    }
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await forgotPassword({
        variables: {
          input: {
            email
          }
        }
      });
    } catch (e) {
      toast.error("Error!", { autoClose: 2000 });
    }
  }

  const successElement = success ? (
    <>
      <Alert 
        severity="success" 
        message="We've sent a password reset link to the email you provided" 
        state={true} 
      />
      <br />
    </>
  ) : null;

  const errorElement = error ? (
    <>
      <Alert severity="error" message={error.message} state={true} />
      <br />
    </>
  ) : null;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CodeIcon fontSize="large" color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {successElement}
          {errorElement}
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Enter Email Address"
            autoFocus
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Recover Password
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/login" className="link-text">
                Have remembered password? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Backdroper open={loading} />
      <Copyright />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
