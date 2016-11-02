import { geoConicConformal } from 'd3-geo'
import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import Timer from './../components/Timer.js'
import TownResultsTable from './../components/TownResultsTable.js'
import Map from './../components/Map.js'
import TestStatus from './../components/TestStatus.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
import Hero from './../components/Hero.js'
import urlManager from './../utils/urlManager.js'
import getTownsShapefile from './../utils/getTownsShapefile.js'
import nameUtil from './../utils/nameUtil.js'
import { racesAreComplete } from './../utils/completenessUtil.js'
import {
	sortByVoteCount,
	sortByCandidateIDs,
} from './../utils/Candidates.js'

const TOWNS = getTownsShapefile()

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '016-11-08?officeID=P&statePostal=US,MA&level=ru'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeID=P&statePostal=US,MA&level=ru'

@connectToApi
class PresidentMA extends Component {

	static getTitle() {
		return nameUtil.presidentMA.htmlTitle()
	}

	static apiUrl() {
		return url
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
		const races = data.races || []

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get the US and MA races.
		const usRace = _.find(races, { statePostal: 'US' }) || {}
		const maRace = _.find(races, { statePostal: 'MA' }) || {}

		// Get the overall units.
		const usUnit =
			_.find(usRace.reportingUnits, { level: 'national' }) || {}
		const maUnit =
			_.find(maRace.reportingUnits, { level: 'state' }) || {}

		// Get summary MA candidates, so we can sort by them.
		const summaryTownCandidates = sortByVoteCount(maUnit.candidates)

		// Prepare the MA race so it can be easily ingested by sub-components:
		const towns = _(maRace.reportingUnits)
			.filter({ level: 'subunit' })
			// sort towns by their full name,
			.sortBy('reportingunitName')
			.map(v => ({
				...v,
				// and sort candidates by overall candidates.
				candidates: sortByCandidateIDs({
					candidates: v.candidates,
					candidateIDs: _.map(summaryTownCandidates, 'candidateID'),
				}),
			}))
			.value()

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
			buttonText={nameUtil.presidentUS.name()}
			buttonUrl={urlManager.race(usRace)}
			displayName='reportingunitName' />) : null

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header summaryState={usUnit} />
				<main id='content'>
					<Hero className='lead-img' title={nameUtil.presidentMA.htmlTitle()} />

					<div className='container-sm'>
						<Timer {...timerProps} />
						<ElectoralCollegeBar {...usUnit} />
					</div>
					<div className='container-lg'>
						{map}
					</div>
					<div className='container-downpage'>
						<TownResultsTable
							{...{ towns, summaryCandidates: summaryTownCandidates }} />
					</div>
				</main>

				<Footer />

			</div>
		)

	}

}

export default PresidentMA
