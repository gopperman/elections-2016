import React, { Component } from 'react'

import _ from 'lodash'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import Hero from './../components/Hero.js'
import urlManager from './../utils/urlManager.js'
import compareStringsNoAlpha from './../utils/compareStringsNoAlpha.js'
import nameUtil from './../utils/nameUtil.js'
import { senateTrendReport } from './../utils/visUtils.js'
import BalanceOfPower from './../components/BalanceOfPower.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?statePostal=M'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?'

@connectToApi
class Office extends Component {

	static getTitle(params) {
		return nameUtil.office.htmlTitle(params)
	}

	static apiUrl(params) {
		return `${url}${urlManager.stringifyParams(params)}`
	}

	render() {

		const { props } = this
		const { results, timerProps, params } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = _.sortBy(data.races || [], 'seatName')

		// Get test status.
		const isTest = _.some(data.races, 'test')

		// Create result blocks for all races of this office type.
		const raceBlocks = races.map((race, i) => {

			const stateUnit =
				_.find(race.reportingUnits, { level: 'state' }) || {}

			const candidates = stateUnit.candidates || []

			return (
				<ResultGroup
					numWinners={race.numWinners}
					key={i}
					overline={nameUtil.race.name(race)}
					precinctsReportingPct={stateUnit.precinctsReportingPct}
					candidates={sortByVoteCount(candidates)}
					buttonText='See full results'
					buttonUrl={urlManager.race(race)} />
			)

		})

		const heroClass = compareStringsNoAlpha(params.statePostal, 'ma') ?
			'lead-ma-map' : 'lead-us-map'

		const title = nameUtil.office.name(params)

		let bop = null
		if (title === 'US Senate') {

			const bopData = senateTrendReport(races)
			bop = <BalanceOfPower {...bopData} displayLink={false} />

		}

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<Hero
						className={heroClass}
						title={title} />
					<div className='container-sm'>
						<Timer {...timerProps} />
						{bop}
						{raceBlocks}
					</div>
				</main>

				<Footer />

			</div>
		)

	}
}

export default Office
