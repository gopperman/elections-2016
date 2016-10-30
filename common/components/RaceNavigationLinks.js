import React from 'react'
import urlManager from './../utils/urlManager.js'
import offices from './../../data/offices.json'

const RaceNavigationLinks = () => (
	<nav className='subnav'>
		<ul className='subnav__list'>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold icon--election'
					href={urlManager.base()}>Election 2016</a>
			</li>
			{offices.map((office, i) => (
				<li key={i} className='subnav__item'>
					<a
						className='subnav__link benton-bold'
						href={urlManager.office(office)}>{office.officeName}</a>
				</li>
			))}
		</ul>
	</nav>
)

export default RaceNavigationLinks
