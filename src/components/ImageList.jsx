import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  tile: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  image: {
    backgroundImage:
      'url(https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e476k439zvde2e8323bg9zrvy58p3lgb7ju3ff7cbn9&rid=giphy.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '100px 100px',
    minHeight: '30vh'
  }
}));

function ImageList({ images, width, onClick }) {
  const classes = useStyles();
  const getGridListCols = () => {
    if (isWidthUp('xl', width)) {
      return 4;
    }

    if (isWidthUp('lg', width)) {
      return 3;
    }

    if (isWidthUp('md', width)) {
      return 2;
    }

    return 1;
  };

  return (
    <GridList spacing={15} cellHeight='auto' cols={getGridListCols()}>
      {images.map((tile) => (
        <GridListTile key={tile.url} cols={1} className={classes.tile}>
          <img
            className={classes.image}
            src={tile.url}
            alt={tile.title}
            onClick={() => {
              onClick(tile);
            }}
            onError={(e) => {
              e.target.style =
                'background-image: url(https://img.icons8.com/ios/452/no-image.png);'; // inline styles in html format
            }}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}

export default withWidth()(ImageList);
