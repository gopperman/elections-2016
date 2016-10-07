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
const url = '2016-11-08?officeID=P'

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

			// // Get US race.
			// const allStates = races.map(v => ({
			// 	...v.reportingUnits[0],
			// }))

			// // Get US presidential race summary.
			// const summaryState = _.find(allStates, { statePostal: 'US' }) || {}

			// // Check if all results are in.
			// const isFinished = +summaryState.precinctsReportingPct === 100

			const isFinished = true

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

		// // Get US race.
		// const allStates = races.map(v => ({
		// 	...v.reportingUnits[0],
		// }))

		// // Get test status.
		// const isTest = _.some(races, 'test')

		// // Get US presidential race summary.
		// const summaryState = _.find(allStates, { statePostal: 'US' })

		// // Define the candidates we're interested in.
		// const mainCandidatePolIDs = ['1746', '8639', '31708', '895']

		// // Get summary US candidates, so we can sort by them.
		// const summaryStateCandidates = summaryState ?
		// 	sortByElectoralCount(summaryState.candidates)
		// 	.map(v => ({
		// 		...v,
		// 		isMainCandidate: _.includes(mainCandidatePolIDs, v.polID),
		// 	})) : []

		// // Prepare the US race so it can be easily ingested by sub-components:
		// const states = _(allStates)
		// 	// don't include summary state,
		// 	.reject({ statePostal: 'US' })
		// 	// sort states by their full name,
		// 	.sortBy('stateName')
		// 	.map(v => ({
		// 		...v,
		// 		// and sort candidates by overall candidates.
		// 		candidates: sortByPolIDs({
		// 			candidates: v.candidates,
		// 			polIDs: _.map(summaryStateCandidates, 'polID'),
		// 		}),
		// 	}))
		// 	.value()

				// <TestStatus isTest={isTest} />

				// <Header summaryState={summaryState} />
				// <h1>PresidentUS</h1>

				// <Timer {...timerProps} />

				// <Map
				// 	topoObject={STATES}
				// 	data={states}
				// 	sortingDelegate={sortByElectoralCount}
				// 	projection={geoAlbersUsa()}
				// 	unitName='statePostal' />

		return (
			<div className='Homepage'>

				<h1>Ohio hangs in balance</h1>
				<h2>subhed</h2>
				<p>nav</p>
				<p>swing states</p>
				<p>us map</p>
				<p>or big photo</p>
				<p>summaries</p>
				<p>selected races</p>
			</div>
		)

	}

}

export default Homepage
