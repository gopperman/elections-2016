import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const App = ({ children }) => (

	<div className='App'>
		<ul>
			<li><Link to='/'>App</Link></li>
			<li><Link to='/state'>State</Link></li>
		</ul>
		{ children }
	</div>

)

App.propTypes = {
	children: PropTypes.object,
}

export default App
