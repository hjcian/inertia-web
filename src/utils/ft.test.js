import { readFileSync } from 'fs'
import { ParseFromString } from './ft.mjs'

const main = () => {
  const path = '/Users/maxcian/projects/react-practices/inertia-web/src/utils/ftdata.csv'
  const data = readFileSync(path, { encoding: 'utf8', flag: 'r' })
  const ret = ParseFromString(data)
  console.log(ret.CurrentHoldings())
}

main()
