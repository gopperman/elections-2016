import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const App = ({ children }) => (

	<div className='App'>
		<h1>App</h1>
		<ul>
			<li><Link to='/state'>State</Link></li>
			<li><Link to='/state/race'>Race</Link></li>
		</ul>
		{ children }
	</div>

)

App.propTypes = {
	children: PropTypes.object.isRequired,
}

export default App
