import React from 'react'
import { Route } from 'react-router'
import App from './components/App.js'
import Election from './containers/Election.js'
import Office from './containers/Office.js'
import PresidentUS from './containers/PresidentUS.js'
import PresidentMA from './containers/PresidentMA.js'
import Race from './containers/Race.js'
import Town from './containers/Town.js'
import HpElectoralCollegeLite from './containers/HpElectoralCollegeLite.js'
import HpFeaturedRacesLite from './containers/HpFeaturedRacesLite.js'
import urlManager from './utils/urlManager.js'

export default (
	<Route path='/' component={App}>

		<Route
			path={urlManager.base()}
			component={Election} />

		<Route
			path={`${urlManager.base()}/hp/bar`}
			component={HpElectoralCollegeLite} />

		<Route
			path={`${urlManager.base()}/hp/races`}
			component={HpFeaturedRacesLite} />

		<Route
			path={`${urlManager.base()}/president`}
			component={PresidentUS} />

		<Route
			path={`${urlManager.base()}/MA/president`}
			component={PresidentMA} />

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
