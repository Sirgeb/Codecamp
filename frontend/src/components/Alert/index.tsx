import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AlertBox from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface Props {
  message: string;
  state: boolean;
  severity: "error" | "info" | "success" | "warning" | undefined;
}

export const Alert = ({ severity, message, state }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(state);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AlertBox
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </AlertBox>
      </Collapse>
    </div>
  );
}
