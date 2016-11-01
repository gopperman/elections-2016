import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'
import Election from './../containers/Election.js'

const ElectoralCollegeRoot = ({ store }) => (
	<Provider store={store}>
		<Election />
	</Provider>
)

ElectoralCollegeRoot.propTypes = {
	store: PropTypes.object.isRequired,
}

export default ElectoralCollegeRoot
