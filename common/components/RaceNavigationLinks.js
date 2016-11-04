import React, { PropTypes } from 'react'
import urlManager from './../utils/urlManager.js'
import offices from './../../data/offices.json'

const RaceNavigationLinks = ({ isFooter }) => (
	<nav className='subnav'>
		<ul className='subnav__list'>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold icon--election'
					href={urlManager.base(isFooter ? 'footer' : 'nav')}>Election 2016</a>
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

RaceNavigationLinks.propTypes = {
	isFooter: PropTypes.bool,
}

export default RaceNavigationLinks
