import React from 'react'
import svgs from './../utils/svgs.js'
import Navigation from './Navigation.js'

const Header = () => (
	<header className='header' key='header'>
		<a href='#content' className='skip-to-main'>Skip to main content</a>
		<div className='header__logo'>
			<a		
					href='http://www.bostonglobe.com/'
					className='header__logo-link'
					dangerouslySetInnerHTML={{ __html: svgs.globeLogo }} />
		</div>
		<Navigation />
	</header>
)

export default Header
