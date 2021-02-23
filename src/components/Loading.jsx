import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      width: '100%'
    },
    indicator: {
      display: 'block',
      margin: '20px auto'
    }
  })
);

export default function Loading(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.indicator} />
    </div>
  );
}
