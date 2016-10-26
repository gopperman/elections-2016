/* eslint-disable global-require */

export default () =>
  (process.env.SSR_ENV === 'client' ?
    require('./../../data/output/TOWNS.json') :
    require('./../../data/output/TOWNS-lite.json'))
