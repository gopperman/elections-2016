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
import getTownsShapefile from './../utils/getTownsShapefile.js'
import urlManager from './../utils/urlManager.js'
import nameUtil from './../utils/nameUtil.js'
import { racesAreComplete } from './../utils/completenessUtil.js'

const TOWNS = getTownsShapefile()

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?statePostal=M'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?'

@connectToApi
class Race extends Component {

	static getTitle(params) {
		return nameUtil.race.htmlTitle(params)
	}

	static apiUrl(params) {
		const newParams = {
			...params,
			level: 'ru',
		}
		return `${url}${urlManager.stringifyParams(newParams)}`
	}

	static areAllRacesComplete(results) {

		// Get all the races.
		const races = _.get(results, 'data.races', [])

		return racesAreComplete(races)

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
					<Hero className='lead-ma-map' title={nameUtil.race.name(race)} />
					<div className='container-sm'>
						<Timer {...timerProps} />

						<ResultGroup
							numWinners={race.numWinners}
							overline={nameUtil.race.name(race)}
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
