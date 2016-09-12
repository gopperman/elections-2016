import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import routes from './../routes.js'

const Root = ({ store, history }) => (
	<Provider store={store}>
		<Router history={history}>
			{ routes }
		</Router>
	</Provider>
)

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}

export default Root
