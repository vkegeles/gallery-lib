import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import SearchBar from 'material-ui-search-bar';
import ImageList from './components/ImageList';
import PropTypes from 'prop-types';
import * as API from './api/api';
import Loading from './components/Loading';
import { paginate } from './utils/paginate';
import SelectControl from './components/SelectControl';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { sortSelect, pageSizeSelect } from './utils/selectLists';
import SlideShow from './components/SlideShow';

const useStyles = makeStyles((theme) => ({
  test: {
    fontSize: '2em',
    textAlign: 'center'
  },
  search: {
    marginBottom: '1em'
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '5px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function MyGallery(props) {
  const {
    search,
    pagination,
    sorting,
    'auto-rotate-time': autoRotateTime
  } = props;

  const classes = useStyles();

  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState(props.feedArray);
  const [sortedImages, setSortedImages] = useState([]);
  const [pagedImages, setPagedImages] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState(
    props['results-per-page']
  );
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [indexModalImage, setIndexModalImage] = useState('');

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
    if (images) {
      const res = getPagedData();
      setPagedImages(res.pagedImages);
      setSortedImages(res.sortedImages);
      setPageCount(res.pageCount);
    }
  }, [images, page, resultsPerPage, searchText, sortField, sortDirection]);

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

  const handleChangeSort = (event) => {
    const selectedSort = sortSelect.find((item) => {
      return item.value === event.target.value;
    });
    setSortField(selectedSort.field);
    setSortDirection(selectedSort.direction);
    setPage(1);
  };

  const handleModalOpen = (image) => {
    const index = sortedImages.indexOf(image);
    setIndexModalImage(index);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const getPagedData = () => {
    const filtered = searchText
      ? images.filter((image) => image.title.match(new RegExp(searchText, 'i')))
      : images;

    const parsed = filtered.map((image) => {
      image.dateparse = new Date(image.date);
      return image;
    });

    const sorted = _.orderBy(parsed, [sortField], [sortDirection]);

    const pagedImages = pagination
      ? paginate(sorted, page, resultsPerPage)
      : sorted;
    const pageCount = Math.ceil(filtered.length / resultsPerPage);

    return {
      totalCount: filtered.length,
      pagedImages,
      pageCount,
      sortedImages: sorted
    };
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
      {pagination && (
        <SelectControl
          defaultValue={resultsPerPage}
          onChange={handleChangeResultPerPage}
          id='images-per-page'
          options={pageSizeSelect}
          nameProps='pageSize'
          label='Images per page'
        />
      )}
      {sorting && (
        <SelectControl
          defaultValue={sortSelect[0].value}
          onChange={handleChangeSort}
          id='sort-by'
          options={sortSelect}
          nameProps='sortBy'
          label='Sort By'
        />
      )}
      {pagedImages && (
        <ImageList images={pagedImages} onClick={handleModalOpen} />
      )}

      {pagination && (
        <Pagination
          count={pageCount}
          color='primary'
          onChange={handlePageChange}
          page={page}
        />
      )}
      {images && images.length === 0 && <h2>No images provided</h2>}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <SlideShow
              autoRotateTimeMs={autoRotateTime * 1000}
              curIndex={indexModalImage}
              images={sortedImages}
            />
          </div>
        </Fade>
      </Modal>
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
  'results-per-page': PropTypes.oneOf([5, 10, 15, 20]),
  sorting: PropTypes.bool,
  'auto-rotate-time': PropTypes.number
};
