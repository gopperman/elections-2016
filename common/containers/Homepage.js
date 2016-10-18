// The `Homepage` class displays homepage content.

import { geoAlbersUsa } from 'd3-geo'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './../actions/actionCreators.js'
import Timer from './../components/Timer.js'
import Map from './../components/Map.js'
import STATES from './../../data/output/STATES.json'
import Header from './../components/templates/Header.js'
import TestStatus from './../components/TestStatus.js'
import SwingStates from './../components/SwingStates.js'
import FeaturedRace from './../components/FeaturedRace.js'

import {
	sortByElectoralCount,
	sortByPolIDs,
} from './../utils/Candidates.js'

// This object maps various properties as React `props`:
const mapDispatchToProps = (dispatch) => ({

	// `actions` which have already been bound with `dispatch`
	// for convenience.
	actions: bindActionCreators(actions, dispatch),

})

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '016-11-08?officeID=P'

// and this one is the correct url - it returns everything.
// const url = '2016-11-08?officeID=P'
const url = 'homepage'

@connect(s => s, mapDispatchToProps)
class Homepage extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		timer: PropTypes.object.isRequired,
		results: PropTypes.object.isRequired,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs. We will use it to fire the `fetch` hook.
	componentDidMount = () => {
		this.fetchData()
	}

	// This gets called once after the component's updates are flushed to DOM.
	// At the moment we will use it to determine whether to stop the clock.
	componentDidUpdate = (prevProps) => {

		const { props } = this
		const { startTimer, cancelTimer } = props.actions
		const { results } = props

		// Did we stop fetching - that is, did we go from `isFetching == true`
		// to `isFetching == false`? If so:
		if (prevProps.results.isFetching && !props.results.isFetching) {

			// Get the data - or an empty object.
			const data = results.data || {}

			// Get API results.
			const races = data.races || []

			// Get US race:
			const presidentRaceStates = races
				// only include 'P' (President) races,
				.filter(v => v.officeID === 'P')
				// return the first item of reportingUnits,
				.map(v => (v.reportingUnits || [])[0])
				// and don't include null items.
				.filter(v => v)

			// Get US presidential race summary.
			const summaryState =
				_.find(presidentRaceStates, { statePostal: 'US' })

			// Check if all results are in.
			const isFinished = +summaryState.precinctsReportingPct === 100

			if (isFinished) {
				cancelTimer()
			} else {
				startTimer()
			}

		}

	}

	// Encapsulate data fetching logic.
	fetchData = () => {
		this.props.actions.fetchResults({ url })
	}

	render() {

		const { props, fetchData } = this
		const { timer, results } = props
		const { stopTimer } = props.actions

		// Prepare `Timer` props, including
		const timerProps = {
			...timer,

			// a callback which gets invoked when the `Timer` runs out. If so,
			callback: () => {

				// fire the `stopTimer` action,
				stopTimer()

				// and fire the `fetch` hook, which will fire the `fetchResults`
				// action.
				fetchData()
			},
		}

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = data.races || []

		// Get president races.
		const presidentRaces = races.filter(v => v.officeID === 'P')

		// Get president race states.
		const presidentRaceStates = presidentRaces
			// return the first item of reportingUnits,
			.map(v => (v.reportingUnits || [])[0])
			// and don't include null items.
			.filter(v => v)

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get US presidential race summary.
		const summaryState =
			_.find(presidentRaceStates, { statePostal: 'US' })

		// Define the candidates we're interested in.
		// TODO: is this necessary?
		const mainCandidatePolIDs = ['1746', '8639', '31708', '895']

		// Get summary US candidates, so we can sort by them.
		// TODO: is this necessary?
		const summaryStateCandidates = summaryState ?
			sortByElectoralCount(summaryState.candidates)
			.map(v => ({
				...v,
				isMainCandidate: _.includes(mainCandidatePolIDs, v.polID),
			})) : []

		// Prepare the US race so it can be easily ingested by sub-components:
		const states = _(presidentRaceStates)
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

		// Get swing states
		const swingStateList = ['AZ', 'CO', 'IA']

		// TODO: test that this works when swing state candidates are [] or null
		const swingStates = _.filter(states, state =>
			_.includes(swingStateList, state.statePostal))

		// TODO: delete this when the API returns level: 'state' data
		const massPresident = _(presidentRaces)
			.filter({ statePostal: 'MA' })
			.map(v => ({
				...v,
				reportingUnits: v.reportingUnits.map(w => ({
					...w,
					level: 'state',
				})),
			}))
			.head()

		const featuredRaces = _.difference(races, presidentRaces)
			.concat(massPresident)
			.filter(v => v)
			.map((race, key) => <FeaturedRace {...{ race, key }} />)

		return (
			<div className='Homepage'>

				<TestStatus isTest={isTest} />

				<Header summaryState={summaryState} />

				<h1>Ohio hangs in balance</h1>
				<h2>subhed</h2>

				<Timer {...timerProps} />

				<SwingStates states={swingStates} />

				<Map
					topoObject={STATES}
					data={states}
					sortingDelegate={sortByElectoralCount}
					projection={geoAlbersUsa()}
					unitName='statePostal'
					dropdownName='state'
					displayUnitLabels
					displayName='stateName' />

				{featuredRaces}

				<p>or big photo</p>

				<p>summaries</p>
				<p>selected races</p>

			</div>
		)

	}

}

export default Homepage
