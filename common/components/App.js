import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const App = ({ children }) => (

	<div className='App'>
		<ul>
			<li><Link to='/'>App</Link></li>
		</ul>
		{ children }
	</div>

)

App.propTypes = {
	children: PropTypes.object.isRequired,
}

export default App
