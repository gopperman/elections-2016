import React from 'react'
import { Route } from 'react-router'
import App from './components/App.js'
import President from './containers/President.js'
import Race from './containers/Race.js'

export default (
	<Route path='/' component={App}>
		<Route path='president' component={President} />
		<Route path='race' component={Race} />
	</Route>
)
