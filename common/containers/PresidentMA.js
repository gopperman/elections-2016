import { geoConicConformal } from 'd3-geo'
import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import BreakingBar from './../components/BreakingBar.js'
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
import ResultGroup from './../components/ResultGroup.js'
import {
	sortByVoteCount,
	sortByCandidateIDs,
} from './../utils/Candidates.js'
import Legend from './../components/Legend.js'

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

	static getSection() {
		return 'Race'
	}

	static getTitle() {
		return nameUtil.presidentMA.htmlTitle()
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
			tooltipSortingDelegate={sortByVoteCount}
			dropdownName='town'
			buttonText={nameUtil.presidentUS.name()}
			buttonUrl={urlManager.race({
				...usRace, source: 'US' })}
			displayName='reportingunitName' />) : null

		return (
			<div>

				<TestStatus isTest={isTest} />
				<BreakingBar alert={breakingNews} />
				<Header summaryState={usUnit} />
				<main id='content'>
					<Hero
						className='lead-img'
						title={nameUtil.presidentMA.htmlTitle()} />

					<Timer {...timerProps} />
					<div className='container-inset'>
						<div className='container-sm'>
							<ElectoralCollegeBar {...usUnit} />
						</div>
					</div>
					<div className='container-sm'>
						<ResultGroup
							overline={nameUtil.race.name(maRace)}
							precinctsReportingPct={maUnit.precinctsReportingPct}
							candidates={summaryTownCandidates} />
					</div>
					<div className='container-lg'>
						{map}
					</div>
					<div className='container-lg'>
						<Legend isPresidential={false} races={towns} />
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
