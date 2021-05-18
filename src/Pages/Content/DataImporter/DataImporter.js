import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { useHoldings } from '../../../global/context/holdings'

import './DataImporter.css'

function FileDropzone () {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='DataImporterDropzone'>
        {
          isDragActive
            ? 'Drop the files here ...'
            : "Drag 'n' drop some files here, or click to select files"
        }
      </p>
    </div>
  )
}

const DataImporter = () => {
  const { updateHoldings } = useHoldings()
  return (
    <div>
      DataImporter Page (csv importer)
      <button onClick={() => {
        updateHoldings('data imported', () => {
          console.log('update OK')
        })
      }}
      > Import Data
      </button>
      <div>
        <FileDropzone />
      </div>
    </div>
  )
}

export default DataImporter
