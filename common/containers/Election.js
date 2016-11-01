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
import { sortByElectoralCount } from './../utils/Candidates.js'
import FeatureGroup from './../components/FeatureGroup.js'
import urlManager from './../utils/urlManager.js'
import { getSenateReport } from './../utils/dataUtil.js'
import getStatesShapefile from './../utils/getStatesShapefile.js'
import nameUtil from './../utils/nameUtil.js'
import swingStatesSelection from './../../data/swing-states.json'

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

	static areAllRacesComplete() {

		// TODO: implement
		return false
	}

	render() {

		const { props } = this
		const { timerProps, results } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get senate report data.
		const senateData = _.map(getSenateReport(data.reports), v => ({
			[v.party]: {
				won: v.won,
				holdovers: v.holdovers,
			},
		}))

		// Build senate balance of power data.
		const bopData = _.assign.apply(null, senateData)

		// Get all races.
		const races = data.races || []

		// Get all presidential races:
		const presRaces = _(races)
			// get all races where officeName='President',
			.filter({ officeName: 'President' })
			// get the first item of reportingUnits,
			.map(v => (v.reportingUnits || [])[0])
			// and don't include null items.
			.filter(v => v)
			.value()

		const presUs = _.find(races,
			{ officeName: 'President', statePostal: 'US' })

		// Get presidential summary.
		const presSummary = _.find(presRaces, { statePostal: 'US' })

		// Get all 51 states.
		const presStates = _.reject(presRaces, { statePostal: 'US' })

		// Specify list of swing states
		const swingStates = presStates.filter(v =>
			_.includes(swingStatesSelection, v.statePostal))

		// Create the map (if we have data).
		const map = presStates.length ? (<Map
			shapefile={STATES}
			data={presStates}
			unitName='stateName'
			projection={geoAlbersUsa()}
			sortingDelegate={sortByElectoralCount}
			dropdownName='state'
			displayName='stateName'
			isPresidential
			buttonText={nameUtil.presidentUS.name()}
			buttonUrl={urlManager.race(presUs)}
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
					<Hero title='Election Home' className='lead-img' isElectionCtrl />

					<div className='container-sm'>

						<Timer {...timerProps} />

						<ElectoralCollegeBar {...presSummary} />
					</div>
					<div className='container-lg'>
						<SwingStates states={swingStates} />
						{map}
					</div>
					<div className='container-downpage'>
						<div className='container-lg'>
							<h3 className='subhed benton-bold'>
								<span>Featured Races</span>
							</h3>
							<div className='r-row--full'>
								<BalanceOfPower {...bopData} displayLink />
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
