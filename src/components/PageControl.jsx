import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

export default function PageControl({ resultsPerPage, onChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id='images-per-page'>
        Images per page
      </InputLabel>
      {/* <Label htmlFor='images-per-page'>Images per page</Label> */}
      <Select
        native
        defaultValue={resultsPerPage}
        labelId='images-per-page'
        onChange={onChange}
        inputProps={{
          name: 'pageSize',
          id: 'images-per-page'
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </Select>
    </FormControl>
  );
}
