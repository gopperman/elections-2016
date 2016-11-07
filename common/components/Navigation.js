/* eslint-disable max-len */

import classNames from 'classnames'
import React, { Component, PropTypes } from 'react'
import RaceNavigationLinks from './RaceNavigationLinks.js'
import urlManager from './../utils/urlManager.js'
import TownLookup from './TownLookup.js'
import nameUtil from './../utils/nameUtil.js'

class Navigation extends Component {

	static propTypes = {
		domain: PropTypes.object,
	}

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
		const { domain } = this.props

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
							className='g-nav__link nav-election benton-bold icon--election'
							href={urlManager(domain).base('nav')}>Election 2016</a>
					</li>
					<li className='g-nav__item town'>
						<button
							className='g-nav__link nav-town benton-bold icon--town'
							onClick={this.townOnClick}>Town results</button>
						<nav className='subnav'>
							<TownLookup domain={domain} />
						</nav>
					</li>
					<li className='g-nav__item race'>
						<button
							className='g-nav__link nav-race benton-bold icon--race'
							onClick={this.raceOnClick}>Find a race</button>
						<RaceNavigationLinks domain={domain} />
					</li>
					<li className='g-nav__item'>
						<a
							className='g-nav__link nav-president benton-bold icon--president'
							href={urlManager(domain).office({ officeName: 'President', source: 'nav' })}>{nameUtil.presidentUS.htmlTitle()}</a>
					</li>
				</ul>
			</nav>
		)

	}

}

export default Navigation
