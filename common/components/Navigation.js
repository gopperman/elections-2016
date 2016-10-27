import classNames from 'classnames'
import React, { Component } from 'react'
import RaceNavigationLinks from './RaceNavigationLinks.js'
import urlManager from './../utils/urlManager.js'
import TownLookup from './TownLookup.js'

class Navigation extends Component {

	state = {
		townIsOpen: false,
		raceIsOpen: false,
	}

	townOnClick = () => {

		// Collapse race and toggle town
		this.setState({
			raceIsOpen: false,
			townIsOpen: !this.state.townIsOpen,
		})

	}

	raceOnClick = () => {

		// Collapse town and toggle race
		this.setState({
			townIsOpen: false,
			raceIsOpen: !this.state.raceIsOpen,
		})

	}

	render() {

		const { townIsOpen, raceIsOpen } = this.state

		const mainClass = classNames('g-nav', {
			'is-open': townIsOpen || raceIsOpen,
			'town-is-open': townIsOpen,
			'race-is-open': raceIsOpen,
		})

		return (
			<nav className={mainClass} key='nav'>
				<ul className='g-nav__list'>
					<li className='g-nav__item'>
						<a
							className='g-nav__link nav-election benton-bold icon icon--election'
							href={urlManager.base()}>Elections 2016</a>
					</li>
					<li className='g-nav__item town'>
						<button
							className='g-nav__link nav-town benton-bold icon icon--town'
							onClick={this.townOnClick}>Town results</button>
						<nav className='subnav'>
							<TownLookup />
						</nav>
					</li>
					<li className='g-nav__item race'>
						<button
							className='g-nav__link nav-race benton-bold icon icon--race'
							onClick={this.raceOnClick}>Find a race</button>
						<RaceNavigationLinks />
					</li>
					<li className='g-nav__item'>
						<a
							className='g-nav__link nav-president benton-bold icon icon--president'
							href={urlManager.office('President')}>Presidential race</a>
					</li>
				</ul>
			</nav>
		)

	}

}

export default Navigation
