import _ from 'lodash'
import { geoConicConformal } from 'd3-geo'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import TownResultsTable from './../components/TownResultsTable.js'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import Hero from './../components/Hero.js'
import Map from './../components/Map.js'
import { getName } from './../utils/Race.js'

import getTownsShapefile from './../utils/getTownsShapefile.js'
const TOWNS = getTownsShapefile()

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?statePostal=M'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?statePostal=MA&level=ru'

@connectToApi
class Race extends Component {

	static apiUrl(params) {
		const { officeName, seatName } = params
		return `${url}&officeName=${officeName}&seatName=${seatName}`
	}

	static areAllRacesComplete(results) {

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const race = data.races && data.races.length ? data.races[0] : {}

		// Get state.
		const state = _.find(race.reportingUnits, { level: 'state' }) || {}

		// Check if all results are in.
		const isFinished = +state.precinctsReportingPct === 100

		return isFinished

	}

	render() {

		const { props } = this
		const { results, timerProps } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const race = data.races && data.races.length ? data.races[0] : {}

		// Get test status.
		const isTest = _.some(data.races, 'test')

		// Get state.
		const state =
			_.find(race.reportingUnits, { level: 'state' }) || {}

		// Get towns.
		const towns = _(race.reportingUnits)
			.filter({ level: 'subunit' })
			.value()

		// Get summary candidates.
		const summaryCandidates = sortByVoteCount(state.candidates || [])

		// Setup a MA-centric projection.
		const massProjection = geoConicConformal()
			.parallels([41 + (43 / 60), 42 + (41 / 60)])
			.rotate([71 + (30 / 60), -41])

		const map = towns.length ? (<Map
			shapefile={TOWNS}
			data={towns}
			unitName='reportingunitName'
			projection={massProjection}
			sortingDelegate={sortByVoteCount}
			dropdownName='town'
			displayName='reportingunitName' />) : null

		// Finally we can render all the components!
		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<Hero title={getName(race)} />
					<div className='container-sm'>
						<Timer {...timerProps} />

						<ResultGroup
							overline={getName(race)}
							precinctsReportingPct={state.precinctsReportingPct}
							candidates={summaryCandidates} />
					</div>
					<div className='container-lg'>
						{map}
					</div>

					<div className='container-downpage'>
						<TownResultsTable {...{ towns, summaryCandidates }} />
					</div>

				</main>

				<Footer />

			</div>
		)

	}

}

export default Race
