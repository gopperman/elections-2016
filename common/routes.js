import React from 'react'
import { Route } from 'react-router'
import App from './components/App.js'
import Election from './containers/Election.js'
import Homepage from './containers/Homepage.js'
import PresidentUS from './containers/PresidentUS.js'
import PresidentMA from './containers/PresidentMA.js'
import Race from './containers/Race.js'
import Town from './containers/Town.js'

export default (
	<Route path='/' component={App}>
		<Route path='homepage' component={Homepage} />
		<Route path='election' component={Election} />
		<Route path='president' component={PresidentUS} />
		<Route path='president/massachusetts' component={PresidentMA} />
		<Route path='race' component={Race} />
		<Route path='town/:townName' component={Town} />
	</Route>
)
