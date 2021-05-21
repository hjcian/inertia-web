import Typography from '@material-ui/core/Typography'

import InvestmentOverview from './InvestmentOverview'
import Holding from './Holdings'

import { useHoldings } from '../../../../global/context/holdings'
import { useLang } from '../../../../global/context/language'

const AssetOverview = () => {
  const { value } = useHoldings()
  const { holdings, summary, fetching } = value
  const { lang } = useLang()
  const { assetOverview } = lang.Content
  return (
    <div className='AssetOverview'>
      <Typography variant='subtitle1' color='textSecondary'>{assetOverview}</Typography>
      <div className='AssetOverviewItem'>
        <InvestmentOverview summary={summary} fetching={fetching} />
      </div>
      <div className='AssetOverviewItem'>
        <Holding holdings={holdings} fetching={fetching} />
      </div>
    </div>
  )
}

export default AssetOverview
