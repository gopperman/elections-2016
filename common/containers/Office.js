import React, { Component } from 'react'

import _ from 'lodash'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import Hero from './../components/Hero.js'
import urlManager from './../utils/urlManager.js'
import { raceName } from './../utils/standardize.js'
import compareStringsNoAlpha from './../utils/compareStringsNoAlpha.js'
import pageUtil from './../utils/pageUtil.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?statePostal=M'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?'

@connectToApi
class Office extends Component {

	static getTitle(params) {
		return pageUtil.office.title(params)
	}

	static apiUrl(params) {
		return `${url}${urlManager.stringifyParams(params)}`
	}

	static areAllRacesComplete(results) {

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = data.races || []

		let allComplete

		// Do we have races?
		if (races.length) {

			// Yes - make sure all are at 100%.
			allComplete = _(races)
				// get its reportingUnits array,
				.map('reportingUnits')
				// flatten to a one-dimensional array,
				.flatten()
				// and see if there is at least one at less than 100% pct.
				.every(v => +v.precinctsReportingPct === 100)

		} else {

			// No - so some sort of error happened. We're not complete.
			allComplete = false
		}

		return allComplete

	}

	render() {

		const { props } = this
		const { results, timerProps, params } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = _.sortBy(data.races || [], 'seatName')

		// Get test status.
		const isTest = _.some(data.races, 'test')

		// Get the first race.
		const firstRace = races[0] || {}

		// Create result blocks for all races of this office type.
		const raceBlocks = races.map((race, i) => {

			const stateUnit =
				_.find(race.reportingUnits, { level: 'state' }) || {}

			const candidates = stateUnit.candidates || []

			return (
				<ResultGroup
					key={i}
					overline={raceName(race)}
					precinctsReportingPct={stateUnit.precinctsReportingPct}
					candidates={sortByVoteCount(candidates)}
					buttonText='See full results'
					buttonUrl={urlManager.race(race)} />
			)

		})

		const heroClass = compareStringsNoAlpha(firstRace.statePostal, 'ma') ?
			'lead-ma-map' : 'lead-us-map'

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<Hero className={heroClass} title={pageUtil.office.name(params)} />

					<div className='container-sm'>

						<Timer {...timerProps} />

						{raceBlocks}

					</div>

				</main>

				<Footer />

			</div>
		)

	}
}

export default Office
