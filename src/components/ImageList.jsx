import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const useStyles = makeStyles((theme) => ({
  tile: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}))

function ImageList({ feed, width }) {
  const classes = useStyles()
  const getGridListCols = () => {
    if (isWidthUp('xl', width)) {
      return 4
    }

    if (isWidthUp('lg', width)) {
      return 3
    }

    if (isWidthUp('md', width)) {
      return 2
    }

    return 1
  }

  return (
    <GridList spacing={15} cellHeight='auto' cols={getGridListCols()}>
      {feed.map((tile) => (
        <GridListTile key={tile.url} cols={1} className={classes.tile}>
          <img src={tile.url} alt={tile.title} />
        </GridListTile>
      ))}
    </GridList>
  )
}

export default withWidth()(ImageList)
