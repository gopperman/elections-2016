import React, { PropTypes } from 'react'

const App = ({ children }) => (

	<div className='App ie11up'>
		{ children }
	</div>

)

App.propTypes = {
	children: PropTypes.object.isRequired,
}

export default App
