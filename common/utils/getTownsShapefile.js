import TOWNS from './../../data/output/TOWNS.json'
import TOWNS_LITE from './../../data/output/TOWNS-lite.json'

export default () =>
  (process.env.SSR_ENV === 'client' ? TOWNS : TOWNS_LITE)
