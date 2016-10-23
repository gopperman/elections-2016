import React from 'react'
import urlManager from './../utils/urlManager.js'
import officeNames from './../../data/offices.json'

const RaceNavigationLinks = () => (
	<nav className='subnav'>
		<ul className='subnav__list'>
			<li className='subnav__item icon-election'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}`}>Election 2016</a>
			</li>
			{officeNames.map((officeName, i) => (
				<li key={i} className='subnav__item'>
					<a
						className='subnav__link benton-bold'
						href={`${urlManager.office(officeName)}`}>{officeName}</a>
				</li>
			))}
		</ul>
	</nav>
)

export default RaceNavigationLinks
