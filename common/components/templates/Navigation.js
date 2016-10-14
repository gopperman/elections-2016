import React from 'react'
import TownLookup from '../TownLookup.js'

const Navigation = () => (
	<div className='nav' key='nav'>
		<ul className='nav__links'>
			<li><a href='/election'>Elections</a></li>
			<li><a href='/town/abington'>By Town</a></li>
			<li><a href='/race'>By Race</a></li>
			<li><a href='/president'>President</a></li>
		</ul>
		<TownLookup />
	</div>
)

export default Navigation
