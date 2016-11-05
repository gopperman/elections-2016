import React from 'react'
import RaceNavigationLinks from './RaceNavigationLinks.js'

const Footer = () => (
	<footer className='footer' key='footer' role='contentinfo'>
		<RaceNavigationLinks isFooter />
		<p className='footer__source benton-regular'>Data source: AP</p>
	</footer>
)

export default Footer
