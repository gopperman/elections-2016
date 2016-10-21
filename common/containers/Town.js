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
import LinkButton from './../components/LinkButton.js'
import urlManager from './../utils/urlManager.js'
import { toTitleCase } from './../utils/standardize.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?locat='

// and this one is the correct url - it returns everything.
const url = '2016-11-08?location='

@connectToApi
class Town extends Component {

	static apiUrl(params) {
		return `${url}${params.townName}`
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
		const { results, params, timerProps } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = data.races || []

		// Get test status.
		const isTest = _.some(data.races, 'test')

		// Get the town's title.
		const townTitle = toTitleCase(params.townName)

		// Create result blocks for all the town races.
		const raceBlocks = races.map((race, i) => {

			const stateUnit = (race.reportingUnits || [])[0] || {}

			const candidates = stateUnit.candidates || []

			const { officeName, seatName } = race
			const raceTitle = [officeName, seatName].filter(v => v).join(', ')

			return (
				<div key={i}>
					<h2 className='benton-bold'>{raceTitle}</h2>
					<ResultGroup
						precinctsReportingPct={stateUnit.precinctsReportingPct}
						candidates={sortByVoteCount(candidates)} />
					<LinkButton text='See full results' url={urlManager.race(race)} />
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
