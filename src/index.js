import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';
import ImageList from './components/ImageList';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  test: {
    margin: '2em',
    padding: '0.5em',
    border: '2px solid #000',
    fontSize: '2em',
    textAlign: 'center'
  },
  search: {
    marginBottom: '1em'
  }
}));

function getBool(value) {
  // eslint-disable-next-line eqeqeq
  return value == 'true';
}

export default function MyGallery(props) {
  const {
    feed,
    'results-per-page': resultsPerPage,
    'auto-rotate-time': autoRotateTime
  } = props;
  const search = getBool(props.search);
  const pagination = getBool(props.pagination);
  const sorting = getBool(props.sorting);
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');

  return (
    <div className={classes.test}>
      {search && (
        <SearchBar
          value={searchText}
          className={classes.search}
          onChange={(newText) => {
            setSearchText(newText);
          }}
        />
      )}
      <ImageList feed={feed} />
    </div>
  );
}

MyGallery.defaultProps = {
  search: true,
  pagination: true,
  'results-per-page': 10,
  sorting: true,
  'auto-rotate-time': 4
};

MyGallery.propTypes = {
  feed: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  search: PropTypes.bool,
  pagination: PropTypes.bool,
  'results-per-page': PropTypes.number,
  sorting: PropTypes.bool,
  'auto-rotate-time': PropTypes.number
};
