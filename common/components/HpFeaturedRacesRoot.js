import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'
import HpFeaturedRaces from './../containers/HpFeaturedRaces.js'

const HomepageRoot = ({ store }) => (
	<Provider store={store}>
		<HpFeaturedRaces params={{}} />
	</Provider>
)

HomepageRoot.propTypes = {
	store: PropTypes.object.isRequired,
}

export default HomepageRoot
