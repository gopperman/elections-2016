import React, { Component } from 'react'
import _ from 'lodash'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import ResultBar from './../components/ResultBar.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import Hero from './../components/Hero.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?locat='

// and this one is the correct url - it returns everything.
const url = '2016-11-08?location='

@connectToApi
class Town extends Component {

	static url(params) {
		return `${url}${params.townName}`
	}

	static areAllRacesComplete(results) {

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = data.races || []

		// For each race,
		const anyIncompleteRaces = _(races)
			// get its reportingUnits array,
			.map('reportingUnits')
			// flatten to a one-dimensional array,
			.flatten()
			// and see if there is at least one at less than 100% pct.
			.some(v => +v.precinctsReportingPct < 100)

		return !anyIncompleteRaces

	}

	render() {

		const { props } = this
		const { results, params, timerProps } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = data.races || []

		// Get test status.
		const isTest = _.some(data.races, 'test')

		const townTitle = params.townName

		const raceBlocks = races.map((race, i) => {

			const stateUnit = (race.reportingUnits || [])[0] || {}

			const candidates = stateUnit.candidates || []

			const candidateBlocks = sortByVoteCount(candidates)
				.map((candidate, key) =>
					<ResultBar {...{ key, candidate, candidates }} />)

			const { officeName, seatName } = race
			const raceTitle = [officeName, seatName].filter(v => v).join(', ')

			return (
				<div key={i}>
					<h2 className='benton-bold'>{raceTitle}</h2>
					{candidateBlocks}
				</div>
			)

		})

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<Hero title={townTitle} />

					<div className='container-lg'>

						<Timer {...timerProps} />

						{raceBlocks}

					</div>

				</main>

				<Footer />

			</div>
		)

	}

}

export default Town
