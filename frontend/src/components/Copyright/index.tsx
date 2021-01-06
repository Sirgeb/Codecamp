import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const Copyright = () => {
  return (
    <Box mt={8} mb={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '} Codecamp {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}
