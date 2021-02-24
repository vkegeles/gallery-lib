import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

export default function SelectControl({
  defaultValue,
  onChange,
  id,
  options,
  nameProps,
  label
}) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id={id}>
        {label}
      </InputLabel>
      <Select
        native
        defaultValue={defaultValue}
        labelId={id}
        onChange={onChange}
        inputProps={{
          name: nameProps,
          id
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
