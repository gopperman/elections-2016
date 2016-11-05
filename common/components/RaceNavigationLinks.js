import React, { PropTypes } from 'react'
import urlManager from './../utils/urlManager.js'
import offices from './../../data/offices.json'
import nameUtil from './../utils/nameUtil.js'

const RaceNavigationLinks = ({ isFooter }) => {

	const source = isFooter ? 'footer' : 'nav'

	return (
		<nav className='subnav'>
			<ul className='subnav__list'>
				<li className='subnav__item'>
					<a
						className='subnav__link benton-bold icon--election'
						href={urlManager.base(source)}>Election 2016</a>
				</li>
				{offices.map((office, i) => {

					const superOffice = {
						...office,
						source,
					}

					const href = urlManager.office(superOffice)

					// We do this so office names don't come with 'Mass.' suffix.
					const nameOffice = {
						...superOffice,
						statePostal: '',
					}

					return (
						<li key={i} className='subnav__item'>
							<a
								className='subnav__link benton-bold'
								href={href}>{nameUtil.office.name(nameOffice)}</a>
						</li>
					)
				})}
			</ul>
		</nav>
	)

}

RaceNavigationLinks.propTypes = {
	isFooter: PropTypes.bool,
}

export default RaceNavigationLinks
