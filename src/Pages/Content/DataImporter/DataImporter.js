import { useHoldings } from '../../../global/HoldingsContext'

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
    </div>
  )
}

export default DataImporter
