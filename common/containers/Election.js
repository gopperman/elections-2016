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
import STATES from './../../data/output/STATES.json'
import { sortByElectoralCount } from './../utils/Candidates.js'
import FeatureGroup from './../components/FeatureGroup.js'
import LinkButton from './../components/LinkButton.js'
import urlManager from './../utils/urlManager.js'
import { getSenateReport } from './../utils/dataUtil.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
const url = '2016-11-08/prezcentral?reports=Trend-s&races=MA-22949,MA-24805'

@connectToApi
class Election extends Component {

	static apiUrl() {
		return url
	}

	static areAllRacesComplete() {

		// TODO: implement
		return true
	}

	render() {

		const { props } = this
		const { timerProps, results } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		const senate = getSenateReport(data.reports)
		const senateDems = _.find(senate, {party: "Dem"})
		const senateGOP = _.find(senate, {party: "GOP"})

		const senateDemCount = (senateDems && senateDems.seats) || 0
		const senateGOPCount = (senateGOP && senateGOP.seats) || 0

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

		// Create the map (if we have data).
		const map = presStates.length ? (<Map
			shapefile={STATES}
			data={presStates}
			unitName='stateName'
			projection={geoAlbersUsa()}
			sortingDelegate={sortByElectoralCount}
			dropdownName='state'
			displayName='stateName'
			labelsName='STUSPS' />) : null

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get featured races.
		const featured = _(races)
			.reject({ officeName: 'President' })
			.map((race, key) => <FeatureGroup {...{ race, key }} />)
			.value()

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<Hero title='Election Home' />

					<div className='container-lg'>

						<Timer {...timerProps} />

						<ElectoralCollegeBar {...presSummary} />

						{map}

						<LinkButton
							text='See full results'
							url={urlManager.race(presUs)} />

						<div className='r-row--full'>
							{featured}
						</div>
						<div className='r-row--full'>
							<BalanceOfPower dem={senateDemCount} gop={senateGOPCount} />
							<BalanceOfPower dem={senateDemCount} gop={senateGOPCount} />
						</div>

					</div>

				</main>

				<Footer />

			</div>
		)

	}

}

export default Election
