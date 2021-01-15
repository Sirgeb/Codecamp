import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const Banner = () => {
  const classes = useStyles();
  const history = useHistory();

  function handleLink() {
    history.push('/bootcamps');
  }

  return (
    <div className={classes.root}>
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531536449196-f026e2317680?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')` }}>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Bootcamps to accelerate your career as a Software Engineer!
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Loaded with programs tailored to give you the right skill
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLink}>
              EXPLORE ALL
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
