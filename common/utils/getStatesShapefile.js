/* eslint-disable global-require */

export default () =>
  (process.env.SSR_ENV === 'client' ?
    require('./../../data/output/STATES.json') :
    require('./../../data/output/STATES-lite.json'))
