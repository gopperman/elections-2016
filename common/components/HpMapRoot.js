import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'
import HpMap from './../containers/HpMap.js'

const HomepageRoot = ({ store }) => (
	<Provider store={store}>
		<HpMap params={{}} />
	</Provider>
)

HomepageRoot.propTypes = {
	store: PropTypes.object.isRequired,
}

export default HomepageRoot
