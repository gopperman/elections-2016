import React from 'react'
import { Redirect, Route, IndexRoute } from 'react-router'
import App from './components/App.js'
import Election from './containers/Election.js'
import Homepage from './containers/Homepage.js'
import Office from './containers/Office.js'
import PresidentUS from './containers/PresidentUS.js'
import PresidentMA from './containers/PresidentMA.js'
import Race from './containers/Race.js'
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
			path={`${urlManager.base()}/president/massachusetts`}
			component={PresidentMA} />
		<Redirect
			from={`${urlManager.base()}/race/president`}
			to={urlManager.office('President')} />

		<Route
			path={`${urlManager.base()}/race/:officeName`}
			component={Office} />

		<Route
			path={`${urlManager.base()}/race/:officeName/:seatName`}
			component={Race} />

		<Route
			path={`${urlManager.base()}/town/:townName`}
			component={Town} />
		<Redirect
			from={`${urlManager.base()}/town`}
			to={urlManager.town('Boston')} />


	</Route>
)
