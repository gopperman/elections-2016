// This container renders the 'Election Central' page.

import _ from 'lodash'
import { geoAlbersUsa } from 'd3-geo'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import BreakingBar from './../components/BreakingBar.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import Promo from './../components/Promo.js'
import TestStatus from './../components/TestStatus.js'
import BalanceOfPowerArc from './../components/BalanceOfPowerArc.js'
import Hero from './../components/Hero.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
import Map from './../components/Map.js'
import SwingStates from './../components/SwingStates.js'
import {
	sortByProductRequirements,
} from './../utils/Candidates.js'
import FeatureGroup from './../components/FeatureGroup.js'
import urlManager from './../utils/urlManager.js'
import getReports from './../utils/getReports.js'
import getStatesShapefile from './../utils/getStatesShapefile.js'
import nameUtil from './../utils/nameUtil.js'
import swingStatesSelection from './../../data/swing-states.json'
import Legend from './../components/Legend.js'
import LinkButton from './../components/LinkButton.js'

const STATES = getStatesShapefile()

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
// eslint-disable-next-line max-len
const url = '2016-11-08/prezcentral?reports=Trend-s,Trend-h&races=MA-24805,NH-31459,MA-24803,MA-22949'

// Note the `@connectToApi` decorator. This higher-order component
// is pretty essential. Make sure to familiarize yourself with its inner
// workings.
@connectToApi
class Election extends Component {

	static getOmnitureTitle() {
		return nameUtil.election.omnitureTitle()
	}

	static getSection() {
		return ''
	}

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

		// Get breaking news.
		const breakingNews = _.first(results.breakingNews) || {}

		// Get senate / house reports.
		const senateReport = _.find(getReports(reports), { officeType: 'S' })
		const houseReport = _.find(getReports(reports), { officeType: 'H' })

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

		// Get presidential summary.
		const presSummaryUnit = _.find(presUnits, { statePostal: 'US' })

		// Get all 51 state units.
		const presStates = _.reject(presUnits, { statePostal: 'US' })

		// Specify list of swing states
		const swingStates = _(presStates)
			.filter(v => _.includes(swingStatesSelection, v.statePostal))
			.sortBy(v => _.indexOf(swingStatesSelection, v.statePostal))
			.value()

		// Create the map (if we have data).
		const map = presStates.length ? (<Map
			shapefile={STATES}
			data={presStates}
			unitName='stateName'
			projection={geoAlbersUsa()}
			tooltipSortingDelegate={sortByProductRequirements}
			dropdownName='state'
			displayName='stateName'
			buttonText={nameUtil.presidentMA.name()}
			buttonUrl={urlManager().race({
				officeName: 'President', statePostal: 'MA', source: 'MA' })}
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
				<BreakingBar alert={breakingNews} />
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
						<SwingStates states={swingStates} />
						<Legend isPresidential races={presStates} />
					</div>
					<div className='container-downpage'>
						<div className='container-lg'>
							<h3 className='subhed benton-bold'>
								<span>Featured races</span>
							</h3>
							<div className='r-row--full'>
								<div className='r-col r-feature'>
									<BalanceOfPowerArc
										{...{
											...senateReport,
											total: 100,
											name: 'US Senate balance of power',
										}} />
									<LinkButton
										text='See full results'
										url={urlManager().office({
											officeName: 'US Senate',
											source: 'balanceofpower' })} />
								</div>
								<div className='r-col r-feature'>
									<BalanceOfPowerArc
										{...{
											...houseReport,
											total: 435,
											name: 'US House balance of power',
										}} />
									<LinkButton
										text='See full results'
										url={urlManager().office({
											officeName: 'US House',
											source: 'balanceofpower' })} />
								</div>
								{featured}
							</div>
						</div>
					</div>
					<Promo />
				</main>
				<Footer />
			</div>
		)

	}

}

export default Election
