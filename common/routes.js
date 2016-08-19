import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.js'
import Home from './containers/Home.js'
import State from './components/State.js'

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Home} />
		<Route path='state' component={State} />
	</Route>
)
