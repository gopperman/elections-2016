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

// TODO:
//		<Route path='elections/2016/office/:officeName' component={Town} />
//		<Route path='elections/2016/ballot-questions/:race' component={Race} />
//		<Route path='elections/2016/ballot-questions' component={()} />
export default (
	<Route path='/' component={App}>
		<IndexRoute component={Homepage} />
		<Route path='elections/2016/election' component={Election} />
		<Route path='elections/2016/president' component={PresidentUS} />
		<Route
			path='elections/2016/president/massachusetts'
			component={PresidentMA} />
		<Route path='elections/2016/race' component={Race} />
		<Route path='elections/2016/town/:townName' component={Town} />
		<Route path='elections/2016/office/:officeName' component={Office} />
	</Route>
)
