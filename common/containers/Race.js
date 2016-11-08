import _ from 'lodash'
import { geoConicConformal } from 'd3-geo'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import BreakingBar from './../components/BreakingBar.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import Promo from './../components/Promo.js'
import TestStatus from './../components/TestStatus.js'
import TownResultsTable from './../components/TownResultsTable.js'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import Hero from './../components/Hero.js'
import Map from './../components/Map.js'
import getTownsShapefile from './../utils/getTownsShapefile.js'
import urlManager from './../utils/urlManager.js'
import nameUtil from './../utils/nameUtil.js'
import Legend from './../components/Legend.js'

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

	static getOmnitureTitle(params) {
		return nameUtil.race.omnitureTitle(params)
	}

	static getSection() {
		return 'Race'
	}

	static getTitle(params) {
		return nameUtil.race.htmlTitle(params)
	}

	static apiUrl({ params }) {
		const newParams = {
			...params,
			level: 'ru',
		}
		return `${url}${urlManager().stringifyParams(newParams)}`
	}

	render() {

		const { props } = this
		const { results, timerProps } = props

		// Get breaking news
		const breakingNews = _.first(results.breakingNews) || {}

		// Get race.
		const race = _.get(results, 'data.races[0]', {})

		// Get test status.
		const isTest = !!race.test

		// Get state.
		const state = _.find(race.reportingUnits, { level: 'state' }) || {}

		// Get towns.
		const towns = _.filter(race.reportingUnits, { level: 'subunit' })

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
			tooltipSortingDelegate={sortByVoteCount}
			dropdownName='town'
			displayName='reportingunitName' />) : null

		const title = nameUtil.race.name(race)

		// Finally we can render all the components!
		return (
			<div>

				<TestStatus isTest={isTest} />
				<BreakingBar alert={breakingNews} />
				<Header />

				<main id='content'>
					<Hero className='lead-ma-map' title={title} />
					<Timer {...timerProps} />

					<div className='container-inset'>
						<div className='container-sm'>
							<ResultGroup
								numWinners={race.numWinners}
								overline={nameUtil.race.name(race)}
								precinctsReportingPct={state.precinctsReportingPct}
								candidates={summaryCandidates} />
						</div>
					</div>

					<div className='container-lg'>
						{map}
						<Legend isPresidential={false} races={towns} />
					</div>

					<div className='container-downpage'>
						<TownResultsTable
							{...{
								towns,
								summaryCandidates,
								raceName: title,
							}} />
					</div>
					<Promo />
				</main>

				<Footer />

			</div>
		)

	}

}

export default Race
