import Dashboard from './Dashboard/Dashboard'
import DataImporter from './DataImporter/DataImporter'

// deal with switch logic
const Content = () => {
    return <div className="Content">
        Content Page (switch by data imported or not)
        <DataImporter />
        <Dashboard />
        </div>
  }

export default Content
