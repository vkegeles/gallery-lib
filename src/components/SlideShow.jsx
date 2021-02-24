import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modalImg: {
    display: 'inline-block',
    backgroundImage:
      'url(https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e476k439zvde2e8323bg9zrvy58p3lgb7ju3ff7cbn9&rid=giphy.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100px 100px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      maxHeight: '85vh',
      minHeight: '50vh',
      width: '80vw'
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      maxWidth: '80vw',
      minWidth: '50vw',
      height: '85vh'
    }
  }
}));

export default function SlideShow({ autoRotateTimeMs, curIndex, images }) {
  const classes = useStyles();
  return (
    <Carousel
      indicators={false}
      navButtonsAlwaysVisible
      interval={autoRotateTimeMs}
      index={curIndex}
    >
      {images.map((item, i) => (
        <img
          key={item.url}
          className={classes.modalImg}
          src={item.url}
          alt={item.title}
          onError={(e) => {
            e.target.style =
              'background-image: url(https://img.icons8.com/ios/452/no-image.png);';
          }}
        />
      ))}
    </Carousel>
  );
}
