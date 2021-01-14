import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CodeIcon from '@material-ui/icons/Code';
import { CHANGE_PASSWORD } from '../../../lib/graphql/mutations';
import { changePassword as ChangePasswordData, changePasswordVariables as ChangePasswordVariables } from '../../../lib/graphql/mutations/ChangePassword/__generated__/changePassword';
import { Copyright, Backdroper, Alert } from '../../';
import { useSetLoggedInUserId } from '../../../hooks';

const INITIAL_STATE = { 
  newPassword: "", 
  newPasswordRepeat: "" 
}

export const ChangePasswordForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const setLoggedInUserId = useSetLoggedInUserId();
  const params: { id: string } = useParams();
  const [password, setPassword] = useState(INITIAL_STATE);
  const [changePassword, { loading, error }] = useMutation<ChangePasswordData, ChangePasswordVariables>(CHANGE_PASSWORD, {
    onCompleted: (data) => {
      if (data && data.changePassword) {
        setLoggedInUserId(data.changePassword.id)
        sessionStorage.setItem("token", data.changePassword.token);
        toast.info("Password Changed Successfully", { autoClose: 2000, className: 'toastify-info' });
        history.push("/");
      } else {
        sessionStorage.removeItem("token");
      }
    }
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await changePassword({
        variables: {
          input: {
            ...password,
            userId: params.id
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CodeIcon fontSize="large" color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {errorElement}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Password"
            type="password"
            id="newPassword"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPasswordRepeat"
            label="Repeat Password"
            type="password"
            id="newPasswordRepeat"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Password
          </Button>
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
