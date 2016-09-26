import React from 'react'
import { Link } from 'react-router'

const Navigation = () => (
	<ul className='nav' key='nav'>
		<li><a href='/election'>Elections</a></li>
		<li><a href='/town/abington'>By Town</a></li>
		<li><a href='/race'>By Race</a></li>
		<li><a href='/president'>President</a></li>
	</ul>
)

export default Navigation