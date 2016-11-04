import { geoAlbersUsa } from 'd3-geo'
import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import StateResultsTable from './../components/StateResultsTable.js'
import BreakingBar from './../components/BreakingBar.js'
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
import Legend from './../components/Legend.js'

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

	static getSection() {
		return 'Race'
	}

	static getTitle() {
		return nameUtil.presidentUS.htmlTitle()
	}

	static apiUrl() {
		return url
	}

	render() {

		const { props } = this
		const { results, timerProps } = props

		// Get breaking news
		const breakingNews = _.first(results.breakingNews) || {}
		
		// Get races.
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

		// Specify list of swing states
		const swingStates = _(states)
			.filter(v => _.includes(swingStatesSelection, v.statePostal))
			.sortBy(v => _.indexOf(swingStatesSelection, v.statePostal))
			.value()

		const tooltipSorter = (candidates) => {
			const cutoff = 4
			const nationalCandidates = sortByElectoralCount(summaryState.candidates)
			const localCandidates = sortByElectoralCount(candidates)

			const natIDs = _.map(nationalCandidates.slice(0, cutoff), 'polID')
			const locIDs = _.map(localCandidates.slice(0, cutoff), 'polID')

			// If the national leaders are the same as the local ones, just return them
			if (!_.difference(locIDs, natIDs).length) {
				return sortByPolIDs({
					candidates: localCandidates,
					polIDs: natIDs,
				})
			}

			return sortByPolIDs({
				candidates: localCandidates.slice(0, cutoff),
				polIDs: _.map(nationalCandidates, 'polID'),
			})
		}

		const map = states.length ? (<Map
			shapefile={STATES}
			data={states}
			unitName='stateName'
			projection={geoAlbersUsa()}
			tooltipSortingDelegate={tooltipSorter}
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
				<BreakingBar {...breakingNews} />
				<Header />
				<main id='content'>
					<Hero className='lead-img' title={nameUtil.presidentUS.name()} />
					<Timer {...timerProps} />
					<div className='container-inset'>
						<div className='container-sm'>
							<ElectoralCollegeBar {...summaryState} />
						</div>
					</div>
					<div className='container-lg'>
						{map}
					</div>
					<div className='container-sm'>
						<SwingStates states={swingStates} />
						<Legend isPresidential races={states} />
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
