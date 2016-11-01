import { geoAlbersUsa } from 'd3-geo'
import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import StateResultsTable from './../components/StateResultsTable.js'
import Map from './../components/Map.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
import Hero from './../components/Hero.js'
import SwingStates from './../components/SwingStates.js'
import urlManager from './../utils/urlManager.js'
import nameUtil from './../utils/nameUtil.js'
import swingStatesSelection from './../../data/swing-states.json'

import {
	sortByElectoralCount,
	sortByPolIDs,
} from './../utils/Candidates.js'

import getStatesShapefile from './../utils/getStatesShapefile.js'

const STATES = getStatesShapefile()

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '016-11-08?officeID=P'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeID=P'

@connectToApi
class PresidentUS extends Component {

	static getTitle() {
		return nameUtil.presidentUS.htmlTitle()
	}

	static apiUrl() {
		return url
	}

	static areAllRacesComplete(results) {

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = data.races || []

		// Get US race:
		const allStates = races
			// return the first item of reportingUnits,
			.map(v => (v.reportingUnits || [])[0])
			// and don't include null items.
			.filter(v => v)

		// Get US presidential race summary.
		const summaryState = _.find(allStates, { statePostal: 'US' }) || {}

		// Check if all results are in.
		const isFinished = +summaryState.precinctsReportingPct === 100

		return isFinished

	}

	render() {

		const { props } = this
		const { results, timerProps } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get all races.
		const races = data.races || []

		// Get US race:
		const allStates = races
			// return the first item of reportingUnits,
			.map(v => (v.reportingUnits || [])[0])
			// and don't include null items.
			.filter(v => v)

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get US presidential race summary.
		const summaryState = _.find(allStates, { statePostal: 'US' })

		// Define the candidates we're interested in.
		const mainCandidatePolIDs = ['1746', '8639', '31708', '895']

		// Get summary US candidates, so we can sort by them.
		const summaryStateCandidates = summaryState ?
			sortByElectoralCount(summaryState.candidates)
			.map(v => ({
				...v,
				isMainCandidate: _.includes(mainCandidatePolIDs, v.polID),
			})) : []

		// Prepare the US race so it can be easily ingested by sub-components:
		const states = _(allStates)
			// don't include summary state,
			.reject({ statePostal: 'US' })
			// sort states by their full name,
			.sortBy('stateName')
			.map(v => ({
				...v,
				// and sort candidates by overall candidates.
				candidates: sortByPolIDs({
					candidates: v.candidates,
					polIDs: _.map(summaryStateCandidates, 'polID'),
				}),
			}))
			.value()

		// Specify list of swing states
		const swingStates = states.filter(v =>
			_.includes(swingStatesSelection, v.statePostal))

		const map = states.length ? (<Map
			shapefile={STATES}
			data={states}
			unitName='stateName'
			projection={geoAlbersUsa()}
			sortingDelegate={sortByElectoralCount}
			dropdownName='state'
			displayName='stateName'
			isPresidential
			buttonText={nameUtil.presidentMA.name()}
			buttonUrl={urlManager.race({ officeName: 'President', statePostal: 'MA' })}
			labelsName='STUSPS' />) : null

		// Finally we can render all the components!
		return (
			<div className='president-is-open'>

				<TestStatus isTest={isTest} />

				<Header />
				<main id='content'>
					<Hero className='lead-img' title={nameUtil.presidentUS.name()} />

					<div className='container-sm'>
						<Timer {...timerProps} />
						<ElectoralCollegeBar {...summaryState} />
					</div>
					<div className='container-lg'>
						<SwingStates states={swingStates} />
						{map}
					</div>
					<div className='container-downpage'>
						<StateResultsTable
							{...{ states, summaryCandidates: summaryStateCandidates }} />
					</div>
				</main>

				<Footer />

			</div>
		)

	}

}

export default PresidentUS
