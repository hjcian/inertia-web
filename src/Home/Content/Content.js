import Dashboard from './Dashboard/Dashboard'
import DataImporter from './DataImporter/DataImporter'

// deal with switch logic
const Content = () => {
    return <div className="Content">
        Content Page

        <DataImporter />
        <Dashboard />
        </div>
  }

export default Content
