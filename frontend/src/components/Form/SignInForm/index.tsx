import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CodeIcon from '@material-ui/icons/Code';
import { Backdroper, Copyright, Alert, GoogleSignInButton } from '../../../components';
import { SIGN_IN_WITH_CREDENTIALS } from '../../../lib/graphql/mutations';
import { signInWithCredentials as SignInData, signInWithCredentialsVariables as SignInVariables } from '../../../lib/graphql/mutations/SignIn/__generated__/signInWithCredentials';
import { useSetLoggedInUserId } from '../../../hooks';

const INITIAL_STATE = {
  email: "",
  password: ""
}

export const SignInForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const setLoggedInUserId = useSetLoggedInUserId();
  const [user, setUser] = useState(INITIAL_STATE);
  const [signIn, { loading, error }] = useMutation<SignInData, SignInVariables>(SIGN_IN_WITH_CREDENTIALS, {
    onCompleted: (data) => {
      if (data && data.signInWithCredentials) {
        setLoggedInUserId(data.signInWithCredentials.id)
        sessionStorage.setItem("token", data.signInWithCredentials.token);
        toast.success("Signed In Successfully", { autoClose: 2000 });
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
      await signIn({
        variables: {
          input: {
            ...user
          }
        }
      });
    } catch (e) {
      toast.error("Error!", { autoClose: 2000 });
    }
  }

  const errorElement = error ? (
    <Alert severity="error" message={error.message} state={true} />
  ) : null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CodeIcon color="primary" fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {errorElement}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={true}
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
            autoComplete="current-password"
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
            Sign In
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
                <Link to="/signup" className="link-text">Don't have an account? Sign up</Link>
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
  },
  img: {
    width: 20, 
    height: 20
  }
}));
