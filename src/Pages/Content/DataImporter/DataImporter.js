import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useHoldings } from '../../../global/context/holdings'

import { ParseFromString } from '../../../utils/ft'
import { FetchPrices } from '../../../utils/fetch'

import './DataImporter.css'

// const fakeData = [
//   {
//     symbol: 'VT',
//     price: 100
//   },
//   {
//     symbol: 'BND',
//     price: 85
//   },
//   {
//     symbol: 'BNDX',
//     price: 56
//   },
//   {
//     symbol: 'VNQ',
//     price: 97.2
//   },
//   {
//     symbol: 'IJS',
//     price: 104.66
//   },
//   {
//     symbol: 'IUSV',
//     price: 72.48
//   }
// ]

const FileDropzone = () => {
  const { updateValue: updateHoldings } = useHoldings()

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0] // set {multiple: false} to accept only one file
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const string = reader.result
      const calc = ParseFromString(string)

      // fetch prices and update it via async call
      FetchPrices(calc.GetSymbols())
        .then(results => {
          calc.UpdatePrices(results)
          updateHoldings({
            holdings: calc.CurrentHoldings(),
            summary: calc.Summary()
          })
        })
        .catch(err => console.log(err))

      // render current holdings first
      updateHoldings({
        holdings: calc.CurrentHoldings(),
        summary: calc.Summary()
      })
    }
    reader.readAsText(file)
  }, [updateHoldings])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    // https://github.com/react-dropzone/react-dropzone/issues/276
    accept: ['text/csv', 'text/plain', 'application/vnd.ms-excel']
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='DataImporterDropzone'>
        {
          isDragActive
            ? 'Drop the files here ...'
            : 'Drag and drop some files here, or click to select file'
        }
      </p>
    </div>
  )
}

const DataImporter = () => {
  return (
    <>
      <FileDropzone />
    </>
  )
}

export default DataImporter
