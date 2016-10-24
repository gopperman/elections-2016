import React, { Component } from 'react'
import classNames from 'classnames'
import RaceNavigationLinks from './RaceNavigationLinks.js'
import urlManager from './../utils/urlManager.js'
// import TownLookup from '../TownLookup.js'

class Navigation extends Component {

	state = {
		expanded: false,
	}

	raceOnClick = () => {
		this.setState({ expanded: !this.state.expanded })
	}

	render() {

		const toggleRaceNav =
			classNames('g-nav', { 'subnav-is-open': this.state.expanded })

		return (
			<nav className={toggleRaceNav} key='nav'>
				<ul className='g-nav__list'>
					<li className='g-nav__item'>
						<a
							className='g-nav__link benton-bold icon icon--election'
							href={urlManager.base()}>Elections 2016</a>
					</li>
					<li className='g-nav__item'>
						<button className='g-nav__link benton-bold icon icon--town'>Town results</button>
					</li>
					<li className='g-nav__item g-nav__item--subnav'>
						<button
							className='g-nav__link benton-bold icon icon--race'
							onClick={this.raceOnClick}>Find a race</button>
						<RaceNavigationLinks />
					</li>
					<li className='g-nav__item'>
						<a
							className='g-nav__link benton-bold icon icon--president'
							href={urlManager.office('President')}>Presidential race</a>
					</li>
				</ul>
			</nav>
		)
	}

}

export default Navigation
