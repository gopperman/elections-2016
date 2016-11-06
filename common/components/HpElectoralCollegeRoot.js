import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'
import HpElectoralCollege from './../containers/HpElectoralCollege.js'

const HomepageRoot = ({ store }) => (
	<Provider store={store}>
		<HpElectoralCollege params={{}} />
	</Provider>
)

HomepageRoot.propTypes = {
	store: PropTypes.object.isRequired,
}

export default HomepageRoot
