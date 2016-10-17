import React from 'react'
import RaceNavigationLinks from './RaceNavigationLinks.js'
import TownLookup from '../TownLookup.js'

const Navigation = () => (
	<div className='nav' key='nav'>
		<ul className='nav__links'>
			<li><a href='/election'>Elections</a></li>
			<li><a href='#'>By Town</a></li>
			<li>
				<a href='/race'>By Race</a>
				<RaceNavigationLinks />
			</li>
			<li><a href='/president'>President</a></li>
		</ul>
	</div>
)

export default Navigation
