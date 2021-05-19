import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { useHoldings } from '../../../global/context/holdings'
import { useLang } from '../../../global/context/language'

import { ParseFromString } from '../../../utils/ft'
import { FetchPrices } from '../../../utils/fetch'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const FileDropzone = () => {
  const { updateValue: updateHoldings } = useHoldings()
  const { lang } = useLang()

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

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    // https://github.com/react-dropzone/react-dropzone/issues/276
    accept: ['text/csv', 'text/plain', 'application/vnd.ms-excel']
  })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ])

  return (
    <div className='DataImporterDropzone'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          {
          isDragActive
            ? lang.Content.dropzoneDragActive
            : lang.Content.dropzoneDragInactive
        }
        </p>
      </div>
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
