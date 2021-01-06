import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { emphasize, withStyles, Theme } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';

interface Props {
  routes: Array<{ name: string, path: string }>
}

export const Breadcrumb = withRouter(({ history, routes }: RouteComponentProps & Props) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
        onClick={() => history.push('/')}
      />
      {routes.map(route => (
        <StyledBreadcrumb 
          component="a" 
          label={route.name}
          onClick={() => history.push(route.path as string)}
        />
      ))}
    </Breadcrumbs>
  );
})

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip) as typeof Chip;
