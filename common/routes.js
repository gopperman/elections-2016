import React from 'react'
import { Route } from 'react-router'

import App from './components/App.js'
import State from './components/State.js'
import Race from './components/Race.js'

const routes = (
	<div>
		<Route path='/' component={App} />
		<Route path='/state' component={State} />
		<Route path='/state/race' component={Race} />
	</div>
)

export default routes
