import React from 'react'
import Navigation from './Navigation.js'

const Header = () => (
	<header className='header' key='header'>
		<a href='#content' className='skip-to-main'>Skip to main content</a>
		<Navigation />
	</header>
)

export default Header
