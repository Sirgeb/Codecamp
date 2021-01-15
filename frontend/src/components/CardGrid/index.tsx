import React from 'react';
import { Link }from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Bootcamp } from '../../types';
import { trimText, formatFee } from '../../lib';

interface Props {
  bootcamps: Bootcamp[]
}

export const CardGrid = ({ bootcamps }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        {bootcamps.map(({ _id, title, image, rating, address, fee }) => (
          <Grid item key={_id} xs={12} sm={6} md={3}>
            <Link to="/bootcamp" className="anchor">
              <ButtonBase className={classes.buttonBase}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {title}
                    </Typography>
                    <Typography variant="subtitle2">
                      Courses: Web Development, UI/UX, Mobile Development
                    </Typography>
                    <div style={{ marginTop: 10 }} className="row space-between align-center"> 
                      <div className={classes.rating}>
                        <Avatar color="primary">{rating}</Avatar>&nbsp;
                        <Rating name="read-only" value={rating} readOnly />
                      </div>
                      <Typography>
                        {formatFee(fee)}
                      </Typography>
                    </div>
                    <div className="column">
                      <LocationOnIcon color="primary" />
                      <Typography variant="subtitle2">{trimText(address, 30)}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 25
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonBase: {
    textAlign: 'left'
  }
}));
