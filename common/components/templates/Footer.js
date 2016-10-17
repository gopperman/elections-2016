import React from 'react'
import FooterNav from './FooterNav.js'
import RaceNavigationLinks from './RaceNavigationLinks.js'

const Footer = () => (
	<div className='footer' key='footer'>
		<FooterNav />
		<h1>Election 2016</h1>
		<RaceNavigationLinks />
	</div>
)

export default Footer
