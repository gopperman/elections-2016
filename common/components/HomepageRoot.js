import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'

const containerName = process.env.HP_CONTAINER
const Container = require(`./../containers/${containerName}`).default
const params = {}

const HomepageRoot = ({ store }) => (
	<Provider store={store}>
		<Container params={params} />
	</Provider>
)

HomepageRoot.propTypes = {
	store: PropTypes.object.isRequired,
}

export default HomepageRoot
