import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

export default function SortInput({ onChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id='sort-by'>
        Sort By
      </InputLabel>
      <Select
        native
        defaultValue={0}
        labelId='sort-by'
        onChange={onChange}
        inputProps={{
          name: 'sortBy',
          id: 'sort-by'
        }}
      >
        <option value={0}>None</option>
        <option value={1}>Title ASC</option>
        <option value={2}>Title DESC</option>
        <option value={3}>Date ASC</option>
        <option value={4}>Date DESC</option>
      </Select>
    </FormControl>
  );
}
