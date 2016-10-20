import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.js'
import Election from './containers/Election.js'
import Homepage from './containers/Homepage.js'
import Office from './containers/Office.js'
import PresidentUS from './containers/PresidentUS.js'
import PresidentMA from './containers/PresidentMA.js'
import Race from './containers/Race.js'
import Town from './containers/Town.js'
import urlManager from './utils/urlManager.js'

// TODO:
//		<Route path='${urlManager.base()}/ballot-questions/:race' component={Race} />
//		<Route path='${urlManager.base()}/ballot-questions' component={()} />

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Homepage} />
		<Route path={`${urlManager.base()}/election`} component={Election} />
		<Route path={`${urlManager.base()}/president`} component={PresidentUS} />
		<Route
			path={`${urlManager.base()}/president/massachusetts`}
			component={PresidentMA} />
		<Route
			path={`${urlManager.base()}/race/:officeName/:seatName`}
			component={Race} />
		<Route path={`${urlManager.base()}/town/:townName`} component={Town} />
		<Route path={`${urlManager.base()}/office/:officeName`} component={Office} />
	</Route>
)
