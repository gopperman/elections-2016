import _ from 'lodash'
import { geoAlbersUsa } from 'd3-geo'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import Hero from './../components/Hero.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
import Map from './../components/Map.js'
import STATES from './../../data/output/STATES.json'
import {
	sortByElectoralCount,
	sortByVoteCount,
} from './../utils/Candidates.js'
import ResultGroup from './../components/ResultGroup.js'
import LinkButton from './../components/LinkButton.js'
import urlManager from './../utils/urlManager.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
const url = '2016-11-08/prezcentral?races=MA-22949,MA-24805'

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
			.value()

		// Create result blocks for all races of this office type.
		const raceBlocks = featured.map((race, i) => {

			const stateUnit =
				_.find(race.reportingUnits, { level: 'state' }) || {}

			const candidates = stateUnit.candidates || []

			return (
				<div key={i}>
					<h2 className='benton-bold'>{race.seatName}</h2>
					<ResultGroup
						precinctsReportingPct={stateUnit.precinctsReportingPct}
						candidates={sortByVoteCount(candidates)} />
					<LinkButton text='See full results' url={urlManager.race(race)} />
				</div>
			)

		})

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

						{raceBlocks}

					</div>

				</main>

				<Footer />

			</div>

		)

	}

}

export default Election
