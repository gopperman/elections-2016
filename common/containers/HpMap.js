import { geoAlbersUsa } from 'd3-geo'
import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Map from './../components/Map.js'
import TestStatus from './../components/TestStatus.js'
import urlManager from './../utils/urlManager.js'
import nameUtil from './../utils/nameUtil.js'

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
class HpMap extends Component {

	static getTitle() {
		return ''
	}

	static apiUrl() {
		return url
	}

	render() {

		const { props } = this
		const { results, timerProps } = props

		// Get all races.
		const races = _.get(results, 'data.races', [])

		// Get US race.
		const allStates = _.map(races, 'reportingUnits[0]')

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

		const map = states.length ? (<Map
			shapefile={STATES}
			data={states}
			unitName='stateName'
			projection={geoAlbersUsa()}
			tooltipSortingDelegate={sortByElectoralCount}
			dropdownName='state'
			displayName='stateName'
			isPresidential
			buttonText={nameUtil.presidentUS.name()}
			buttonUrl={urlManager.base()}
			labelsName='STUSPS' />) : null

		// Finally we can render all the components!
		return (
			<div className='election-graphic'>

				<TestStatus isTest={isTest} />

				<Timer {...timerProps} />

				{map}

			</div>
		)

	}

}

export default HpMap

