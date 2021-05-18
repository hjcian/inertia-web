import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useHoldings } from '../../../global/context/holdings'

import { ParseFromString } from '../../../utils/ft'

import './DataImporter.css'

function FileDropzone ({ updateHoldings }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const string = reader.result
        const calc = ParseFromString(string)
        updateHoldings(calc)
      }
      reader.readAsText(file)
    })
  }, [updateHoldings])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
  const { updateValue: updateHoldings } = useHoldings()
  return (
    <div>
      <FileDropzone updateHoldings={updateHoldings} />
    </div>
  )
}

export default DataImporter
