import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'
import HpNav from './../containers/HpNav.js'

const HomepageRoot = ({ store }) => (
	<Provider store={store}>
		<HpNav params={{}} />
	</Provider>
)

HomepageRoot.propTypes = {
	store: PropTypes.object.isRequired,
}

export default HomepageRoot

