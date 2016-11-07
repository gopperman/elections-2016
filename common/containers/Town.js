import React, { Component } from 'react'
import _ from 'lodash'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import BreakingBar from './../components/BreakingBar.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import Promo from './../components/Promo.js'
import TestStatus from './../components/TestStatus.js'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import Hero from './../components/Hero.js'
import urlManager from './../utils/urlManager.js'
import nameUtil from './../utils/nameUtil.js'
import { toTitleCase } from './../utils/standardize.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?locat='

// and this one is the correct url - it returns everything.
const url = '2016-11-08?'

@connectToApi
class Town extends Component {

	static getOmnitureTitle(params) {
		return nameUtil.town.omnitureTitle(params)
	}

	static getSection() {
		return 'Town'
	}

	static getTitle(params) {
		return nameUtil.town.htmlTitle(params)
	}

	static apiUrl({ params }) {
		return `${url}${urlManager().stringifyParams(params)}`
	}

	render() {

		const { props } = this
		const { results, params, timerProps } = props

		// Get breaking news
		const breakingNews = _.first(results.breakingNews) || {}

		// Get races.
		const races = _.get(results, 'data.races', [])

		// Get test status.
		const isTest = _.some(races, 'test')

		const town = toTitleCase(urlManager().decode(params.location))

		// Create result blocks for all the town races.
		const raceBlocks = races.map((race, i) => {

			const stateUnit = _.get(race, 'reportingUnits[0]', {})

			const candidates = stateUnit.candidates || []

			return (
				<ResultGroup
					numWinners={race.numWinners}
					key={i}
					overline={nameUtil.race.name(race)}
					overlineSuffix={town}
					precinctsReportingPct={stateUnit.precinctsReportingPct}
					candidates={sortByVoteCount(candidates)}
					buttonText='See full results'
					hideCheckmark
					buttonUrl={urlManager().race(race)} />
			)

		})

		return (
			<div>

				<TestStatus isTest={isTest} />
				<BreakingBar alert={breakingNews} />
				<Header />

				<main id='content'>

					<Hero
						className='lead-ma-map'
						title={nameUtil.town.htmlTitle(params)} />

					<Timer {...timerProps} />
					<div className='container-sm'>
						{raceBlocks}
					</div>

					<Promo />
				</main>

				<Footer />

			</div>
		)

	}

}

export default Town
