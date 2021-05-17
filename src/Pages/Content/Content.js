import Dashboard from './Dashboard/Dashboard'
import DataImporter from './DataImporter/DataImporter'
import { useHoldings } from '../../global/HoldingsContext'

const Content = () => {
  const { holdings } = useHoldings()
  return (
    <div className='Content'>
      {
        holdings === null
          ? <DataImporter />
          : <Dashboard />
      }
    </div>
  )
}

export default Content
