import React from 'react'
import { Link } from 'react-router'

const App = () => (

	<div className='App'>
		<h1>App</h1>
		<ul>
			<li><Link to='/state'>State</Link></li>
			<li><Link to='/state/race'>Race</Link></li>
		</ul>
	</div>

)

export default App
