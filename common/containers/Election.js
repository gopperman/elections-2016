import _ from 'lodash'
import { geoAlbersUsa } from 'd3-geo'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import BalanceOfPower from './../components/BalanceOfPower.js'
import Hero from './../components/Hero.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
import Map from './../components/Map.js'
import SwingStates from './../components/SwingStates.js'
import { sortByElectoralCount, sortByPolIDs } from './../utils/Candidates.js'
import FeatureGroup from './../components/FeatureGroup.js'
import urlManager from './../utils/urlManager.js'
import getReports from './../utils/getReports.js'
import getStatesShapefile from './../utils/getStatesShapefile.js'
import nameUtil from './../utils/nameUtil.js'
import swingStatesSelection from './../../data/swing-states.json'
import Legend from './../components/Legend.js'

const STATES = getStatesShapefile()

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
const url = '2016-11-08/prezcentral?reports=Trend-s&races=MA-22949,MA-24805'

@connectToApi
class Election extends Component {

	static getTitle() {
		return nameUtil.election.htmlTitle()
	}

	static apiUrl() {
		return url
	}

	render() {

		const { props } = this
		const { timerProps, results } = props

		// Get the reports.
		const reports = _.get(results, 'data.reports', [])

		// Get senate report data.
		const senateReport =
			_.find(getReports(reports), { officeType: 'S' })

		const balanceOfPower = senateReport ?
			<BalanceOfPower
				{...senateReport}
				total={435}
				rows={29}
				displayLink /> : null

		// Get all races.
		const races = _.get(results, 'data.races', [])

		// Get all presidential units:
		const presUnits = _(races)
			// get all races where officeName='President',
			.filter({ officeName: 'President' })
			// get the reporting units,
			.map('reportingUnits')
			// and flatten.
			.flatten()
			.value()

		const presSummaryRace = _.find(races,
			{ officeName: 'President', statePostal: 'US' })

		// Get presidential summary.
		const presSummaryUnit = _.find(presUnits, { statePostal: 'US' })

		// Get all 51 state units.
		const presStates = _.reject(presUnits, { statePostal: 'US' })

		// Specify list of swing states
		const swingStates = _(presStates)
			.filter(v => _.includes(swingStatesSelection, v.statePostal))
			.sortBy(v => _.indexOf(swingStatesSelection, v.statePostal))
			.value()

		const tooltipSorter = (candidates) => {
			const cutoff = 4
			const nationalCandidates = sortByElectoralCount(presSummaryUnit.candidates)
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

		// Create the map (if we have data).
		const map = presStates.length ? (<Map
			shapefile={STATES}
			data={presStates}
			unitName='stateName'
			projection={geoAlbersUsa()}
			tooltipSortingDelegate={tooltipSorter}
			dropdownName='state'
			displayName='stateName'
			isPresidential
			buttonText={nameUtil.presidentMA.name()}
			buttonUrl={urlManager.race({ officeName: 'President', statePostal: 'MA' })}
			labelsName='STUSPS' />) : null

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get featured races.
		const featured = _(races)
			.reject({ officeName: 'President' })
			.map((race, key) => <FeatureGroup {...{ race, key }} />)
			.value()

		return (
			<div className='election-is-open'>
				<TestStatus isTest={isTest} />
				<Header />
				<main id='content'>
					<Hero
						title='Election Home'
						className='lead-img'
						isElectionCtrl />
					<Timer {...timerProps} />
					<div className='container-inset'>
						<div className='container-sm'>
							<ElectoralCollegeBar {...presSummaryUnit} />
						</div>
					</div>
					<div className='container-lg'>
						{map}
					</div>
					<div className='container-sm'>
						<SwingStates states={swingStates} />
						<Legend isPresidential races={presStates} />
					</div>
					<div className='container-downpage'>
						<div className='container-lg'>
							<h3 className='subhed benton-bold'>
								<span>Featured Races</span>
							</h3>
							<div className='r-row--full'>
								<div className='r-col r-feature'>
									{balanceOfPower}
								</div>
								{featured}
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		)

	}

}

export default Election
