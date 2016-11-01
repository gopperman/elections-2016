/* eslint-disable global-require */

// TODO: remove this on production
require('babel-register')

if (process.env.NODE_ENV === 'production') {

	require('./server.homepage.prod.js')

} else {

	require('./server.homepage.dev.js')

}
