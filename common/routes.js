import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.js'
import Election from './containers/Election.js'
import Homepage from './containers/Homepage.js'
import Office from './containers/Office.js'
import PresidentUS from './containers/PresidentUS.js'
import PresidentMA from './containers/PresidentMA.js'
import Race from './containers/Race.js'
import Senate from './containers/Senate.js'
import Town from './containers/Town.js'
import urlManager from './utils/urlManager.js'

export default (
	<Route path='/' component={App}>

		<IndexRoute component={Homepage} />

		<Route
			path={urlManager.base()}
			component={Election} />

		<Route
			path={`${urlManager.base()}/president`}
			component={PresidentUS} />

		<Route
			path={`${urlManager.base()}/MA/president`}
			component={PresidentMA} />

		<Route
			path={urlManager.office({ officeName: 'US Senate' })}
			component={Senate} />

		<Route
			path={`${urlManager.base()}/:officeName`}
			component={Office} />

		<Route
			path={`${urlManager.base()}/:statePostal/:officeName`}
			component={Office} />

		<Route
			path={`${urlManager.base()}/:statePostal/town/:location`}
			component={Town} />

		<Route
			path={`${urlManager.base()}/:statePostal/:officeName/:seatName`}
			component={Race} />

	</Route>
)
