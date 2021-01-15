import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const MiniBanner = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleLink = () => {
    history.push('/profile');
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499914485622-a88fac536970?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')` }}>
            <div className={classes.overlay} />
            <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h4" color="inherit" gutterBottom>
              Help other students by sharing your exprience in one of our bootcamps
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLink}>
              Write a Review
            </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)` }}>
            <div className={classes.overlay} />
            <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h4" color="inherit" gutterBottom>
              Rate our bootcamps based on the experience you had while learning
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLink}>
              Rate a Bootcamp
            </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
    backgroundColor: 'rgba(0,0,0,.4)',
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
