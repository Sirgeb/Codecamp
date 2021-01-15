import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { CardGrid, Breadcrumb, SelectBox, Meta } from '../../components';

export const BootcampsPage = () => {
  useScrollToTop();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Meta title="Codecamp | Bootcamps" />
      <Breadcrumb 
        routes={[
          {name: "Bootcamps", path: "/bootcamps"}
        ]} 
      />
      <div className={classes.filterRow}>        
        <div className={classes.filterRowItem}>
          <Typography variant="subtitle1">
            Filter by Price
          </Typography>
          <SelectBox />
        </div>
        <Pagination count={2} variant="outlined" color="primary" />
      </div>
      {/* <CardGrid bootcamps={bootcamps} /> */}
      <div className={classes.footerPagination}>
        <Pagination count={2} variant="outlined" color="primary" />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 90
  },
  filterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  },
  filterRowItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerPagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 50
  }
}));
