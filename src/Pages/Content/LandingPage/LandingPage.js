import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Typography, Button, Box } from '@material-ui/core'
import WarnSnackBar from '../../../global/Components/WarningSnackbar'
import StepCard from './StepCard'
import { useLang } from '../../../global/context/language'
import { useHoldings } from '../../../global/context/holdings'
import { ParseFromString } from '../../../utils/ft'
import { FetchPrices } from '../../../utils/fetch'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2rem'
  },
  desc: {
    width: '70%',
    fontWeight: 'lighter',
    fontSize: '1rem',
    marginTop: '1rem'
  },
  stepsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  input: {
    display: 'none'
  }
}))

const LandingPage = () => {
  const { updateValue: updateHoldings } = useHoldings()
  const classes = useStyles()
  const { LandingPage } = useLang().lang

  const [openInvalidDataWarn, setOpenInvalidDataWarn] = useState(false)

  const handleFiles = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onabort = () => {
      console.log('file reading was aborted')
      setOpenInvalidDataWarn(true)
    }
    reader.onerror = () => {
      console.log('file reading has failed')
      setOpenInvalidDataWarn(true)
    }

    reader.onload = () => {
      const string = reader.result
      const calculator = ParseFromString(string)
      if (calculator === null) {
        console.log('invalid data')
        setOpenInvalidDataWarn(true)
        return
      }

      // fetch prices and update it via async call
      FetchPrices(calculator.GetSymbols())
        .then(results => {
          calculator.UpdatePrices(results)
          updateHoldings({
            calculator,
            holdings: calculator.CurrentHoldings(),
            summary: calculator.Summary(),
            fetching: false
          })
        })
        .catch(err => console.log(err))

      // render current holdings first
      updateHoldings({
        calculator,
        holdings: calculator.CurrentHoldings(),
        summary: calculator.Summary(),
        fetching: true
      })
    }

    reader.onloadend = () => {
      e.target.value = '' // onchange event needed: https://stackoverflow.com/a/30357800/8694937
      console.log('load end')
    }
    try {
      reader.readAsText(file, 'utf-8')
    } catch (error) {
      console.log('(readAsText error) invalid data')
      setOpenInvalidDataWarn(true)
    }
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Typography component='span' className={classes.title} variant='h5'>
        {LandingPage.mainTitle}
      </Typography>
      <Typography component='span' className={classes.desc} variant='body1'>
        <Box>{LandingPage.desc}</Box>
        <Box>{LandingPage.subDesc}</Box>
      </Typography>
      <div className={classes.stepsContainer}>
        {LandingPage.steps.map(info => <StepCard key={info.title} info={info} />)}
      </div>
      <input
        accept='text/csv,text/plain,application/vnd.ms-excel'
        className={classes.input}
        id='contained-button-file'
        multiple={false}
        type='file'
        onChange={handleFiles}
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          {LandingPage.uploadButton}
        </Button>
      </label>
      <WarnSnackBar warnText={LandingPage.invalidDataWarnText} isOpen={openInvalidDataWarn} closer={setOpenInvalidDataWarn} />
    </div>
  )
}

export default LandingPage
