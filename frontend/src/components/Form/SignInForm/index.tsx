import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CodeIcon from '@material-ui/icons/Code';
import google_icon from '../../../assets/google_logo.jpg';
import { Copyright } from '../../Copyright';

interface Props {}

export const SignInForm = () => {
  const classes = useStyles();

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
        <form className={classes.form} noValidate>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Typography className="row center" variant="subtitle2">OR</Typography>
          <Button 
            variant="outlined" 
            fullWidth
            color="primary"
          >
            <img src={google_icon} className={classes.img} alt="google icon" /> &nbsp; Sign in with Google
          </Button>
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
