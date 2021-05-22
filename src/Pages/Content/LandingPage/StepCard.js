import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    fontFamily: 'Noto Sans',
    minWidth: '20%',
    minHeight: '40vh',
    height: 320,
    width: 250,
    background: 'rgba(0,0,0,0)',
    margin: '1rem 0.7rem'
  },
  mediaContainer: {
    width: '100%',
    height: '60%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#495057'
  },
  desc: {
    fontSize: '0.8rem',
    color: '#adb5bd'
  }
})

export default function StepCard ({ info }) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <div className={classes.mediaContainer}>
        <CardMedia
          component='img'
          image={info.imageURL}
        />
      </div>
      <CardContent>
        <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
          {info.title}
        </Typography>
        <Typography className={classes.desc} variant='body2' color='textSecondary' component='p'>
          {info.desc}
        </Typography>
      </CardContent>
    </Card>
  )
}
