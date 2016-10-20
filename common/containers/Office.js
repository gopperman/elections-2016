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

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?statePostal=M'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeName='

@connectToApi
class Office extends Component {

	static apiUrl(params) {
		return `${url}${params.officeName}`
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
			// try to find the state-level reporting unit,
			.map(v => _.find(v, { level: 'state' }))
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

		const title = params.officeName

		const raceBlocks = races.map((v, i) => {

			const stateUnit =
				_.find(v.reportingUnits, { level: 'state' }) || {}

			const candidates = stateUnit.candidates || []

			return (
				<div key={i}>
					<h2 className='benton-bold'>{v.seatName}</h2>
					<ResultGroup
						precinctsReportingPct={stateUnit.precinctsReportingPct}
						candidates={sortByVoteCount(candidates)} />
				</div>
			)

		})

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<Hero title={title} />

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

export default Office
