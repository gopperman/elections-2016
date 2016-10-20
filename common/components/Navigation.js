import React from 'react'
// import RaceNavigationLinks from './RaceNavigationLinks.js'
// import TownLookup from '../TownLookup.js'

const Navigation = () => (
	<nav className='g-nav' key='nav'>
		<ul className='g-nav__list'>
			<li className='g-nav__item'>
				<a className='g-nav__link benton-bold icon icon--election' href='/election'>Elections 2016</a>
			</li>
			<li className='g-nav__item'>
				<a className='g-nav__link benton-bold icon icon--town' href='/town'>Town results</a>
			</li>
			<li className='g-nav__item g-nav__item--subnav'>
				<a className='g-nav__link benton-bold icon icon--race' href='/race'>Find a race</a>
				{/* <RaceNavigationLinks /> */}
			</li>
			<li className='g-nav__item'>
				<a className='g-nav__link benton-bold icon icon--president' href='/president'>Presidential race</a>
			</li>
		</ul>
	</nav>
)

export default Navigation
