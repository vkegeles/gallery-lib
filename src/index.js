import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ImageList from './components/ImageList'

const useStyles = makeStyles((theme) => ({
  test: {
    margin: '2em',
    padding: '0.5em',
    border: '2px solid #000',
    fontSize: '2em',
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  }
}))

export default function MyGallery(props) {
  const { feed } = props
  console.log(window.location.origin)
  const classes = useStyles()
  return (
    <div className={classes.test}>
      <ImageList feed={feed} />
    </div>
  )
}
