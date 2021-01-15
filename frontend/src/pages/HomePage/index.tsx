import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Banner, CardGrid, MiniBanner, Meta } from '../../components';

export const HomePage = () => {
  useScrollToTop();
  
  return (
    <>
      <Meta />
      <Banner />
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        <div className="titleHolder">
          Popular Bootcamps
        </div>
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        To help you get started from our listings, we have selected a few of them you might be interested in. Join over one million devs who are aspiring to be world class developer.
      </Typography>
      {/* <CardGrid bootcamps={bootcamps} /> */}
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Are you a Codecamp graduate?
      </Typography>
      <MiniBanner />
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Need Assistance?
      </Typography>        
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Contact us for guidiance by writing us at admin@codecamp.herokuapp.com
      </Typography>
    </>
  )
}
