import React, { Component, PropTypes } from 'react'
import { Router, Route } from 'react-router'
import App from './App.js'
import State from './State.js'
import Race from './Race.js'

// eslint-disable-next-line react/prefer-stateless-function
class Root extends Component {

	static propTypes = {
		history: PropTypes.object.isRequired,
	}

	render() {

		const { history } = this.props

		return (
			<Router history={history}>
				<Route path='/' component={App}>
					<Route path='/state' component={State} />
					<Route path='/state/race' component={Race} />
				</Route>
			</Router>
		)

	}

}
export default Root
