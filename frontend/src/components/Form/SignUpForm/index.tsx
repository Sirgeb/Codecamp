import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CodeIcon from '@material-ui/icons/Code';
import { toast } from 'react-toastify';
import { SIGN_UP_WITH_CREDENTIALS } from '../../../lib/graphql/mutations';
import { signUpWithCredentials as SignUpData, signUpWithCredentialsVariables as SignUpVariables } from '../../../lib/graphql/mutations/SignUp/__generated__/signUpWithCredentials';
import { Backdroper, Alert, GoogleSignInButton, Copyright } from '../../../components';
import { useSetLoggedInUserId } from '../../../hooks';

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  password: ""
}

export const SignUpForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const setLoggedInUserId = useSetLoggedInUserId();
  const [user, setUser] = useState(INITIAL_STATE);
  const [signUp, { loading, error }] = useMutation<SignUpData, SignUpVariables>(SIGN_UP_WITH_CREDENTIALS, {
    onCompleted: (data) => {
      if (data && data.signUpWithCredentials) {
        setLoggedInUserId(data.signUpWithCredentials.id)
        sessionStorage.setItem("token", data.signUpWithCredentials.token);
        toast.info("Signed Up Successfully", { autoClose: 2000, className: 'toastify-info' });
        history.push("/");
      } else {
        sessionStorage.removeItem("token");
      }
    }
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await signUp({
        variables: {
          input: {
            ...user
          }
        }
      });
    } catch (error) {
      toast.error("Error!", { autoClose: 2000 });
    }
  }

  const errorElement = error ? (
    <>
      <Alert severity="error" message={error.message} state={true} />
      <br />
    </>
  ) : null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CodeIcon color="primary" fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {errorElement} 
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus={true}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Typography className="row center" variant="subtitle2">OR</Typography>
          <GoogleSignInButton />
          <br /><br />
          <Grid container>
            <Grid item xs>
              <Typography variant="body2">
                <Link to="/forgot-password" className="link-text">Forgot password?</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="primary">
                <Link to="/login" className="link-text">Already have an account? Sign in</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright />
      <Backdroper open={loading} />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));
