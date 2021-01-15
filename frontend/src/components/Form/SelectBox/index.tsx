import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const SelectBox = () => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState('High to Low');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };
  
  return (
    <FormControl className={classes.formControl}>
      <Select
        id="filter"
        value={filter}
        onChange={handleChange}
      >
        <MenuItem value="High to Low">High to Low</MenuItem>
        <MenuItem value="Low to High">Low to High</MenuItem>
      </Select>
    </FormControl>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);
