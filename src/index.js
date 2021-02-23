import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

import SearchBar from 'material-ui-search-bar';
import ImageList from './components/ImageList';
import PropTypes from 'prop-types';
import * as API from './api/api';
import Loading from './components/Loading';
import { paginate } from './utils/paginate';
import PageControl from './components/PageControl';

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

export default function MyGallery(props) {
  const {
    search,
    pagination,
    sorting,
    // 'results-per-page': resultsPerPage,
    'auto-rotate-time': autoRotateTime
  } = props;

  const classes = useStyles();

  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState(props.feedArray);
  const [pagedImages, setPagedImages] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState(
    props['results-per-page']
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!images && props.feedPath) {
      API.fetchData(props.feedPath, (images) => {
        setImages(images);
        setIsLoading(false);
      }).then(() => {});
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (images && pagination) {
      const { pageCount, pagedImages } = getPagedData();
      setPagedImages(pagedImages);
      setPageCount(pageCount);
    }
  }, [images, page, resultsPerPage, searchText]);

  const handleChangeSearch = (newText) => {
    setSearchText(newText);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleChangeResultPerPage = (event) => {
    setResultsPerPage(event.target.value);
    setPage(1);
  };

  const getPagedData = () => {
    const filtered = searchText
      ? images.filter((image) => image.title.match(new RegExp(searchText, 'i')))
      : images;

    console.log(filtered);
    // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const pagedImages = paginate(filtered, page, resultsPerPage);
    const pageCount = Math.ceil(filtered.length / resultsPerPage);
    console.log(pagedImages);
    console.log(pageCount);

    return { totalCount: filtered.length, pagedImages, pageCount };
  };

  return (
    <div className={classes.test}>
      {search && (
        <SearchBar
          value={searchText}
          className={classes.search}
          onChange={handleChangeSearch}
        />
      )}
      {isLoading && <Loading />}
      {pagination && pagedImages && <ImageList images={pagedImages} />}
      {!pagination && images && <ImageList images={images} />}

      {pagination && (
        <Pagination
          count={pageCount}
          color='primary'
          onChange={handlePageChange}
          page={page}
        />
      )}
      {pagination && (
        <PageControl
          resultsPerPage={resultsPerPage}
          onChange={handleChangeResultPerPage}
        />
      )}
      {images && images.length === 0 && <h2>No images provided</h2>}
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
  feedArray: (props, propName, componentName) => {
    if (!props.feedArray && !props.feedPath) {
      return new Error('One among feedArray or feedPath prop must be provided');
    }
    if (props.feedArray && !Array.isArray(props.feedArray)) {
      return new Error('feedArray prop must be array');
    }
  },

  feedPath: (props, propName, componentName) => {
    if (!props.feedArray && !props.feedPath) {
      return new Error('One among feedArray or feedPath prop must be provided');
    }
    if (props.feedPath && typeof props.feedPath !== 'string') {
      return new Error('feedPath prop must be string');
    }
  },

  search: PropTypes.bool,
  pagination: PropTypes.bool,
  'results-per-page': PropTypes.number,
  sorting: PropTypes.bool,
  'auto-rotate-time': PropTypes.number
};
