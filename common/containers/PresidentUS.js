// The `PresidentUS` class displays presidential results for US.

// TODO: figure out how best to display test data status
import { geoAlbersUsa } from 'd3-geo'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import Timer from './../components/Timer.js'
import StateResultsTable from './../components/StateResultsTable.js'
import Map from './../components/Map.js'
import STATES from './../../data/output/STATES.json'
import Header from './../components/templates/Header.js'
import Footer from './../components/templates/Footer.js'
import TestStatus from './../components/TestStatus.js'

import {
	sortByElectoralCount,
	sortByPolIDs,
} from './../utils/Candidates.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '016-11-08?officeID=P'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeID=P'

// This object, used by the `@provideHooks` decorator, defines our custom
// data loading dependencies. At the moment we just have one: `fetch`. It
// gets triggered on both server and client.
const hooks = {

	// `fetch` takes a `dispatch` argument, which we will use to fire
	// our custom data loading actions. In this case, we dispatch the
	// `fetchResults` action.
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url })),
}

// This object maps various properties as React `props`:
const mapDispatchToProps = (dispatch) => ({

	// `actions` which have already been bound with `dispatch`
	// for convenience,
	actions: bindActionCreators(actions, dispatch),

	// and `dispatch`, so we can pass it to `fetch` above. Normally we
	// wouldn't set `dispatch` as a React `props`, but we need it to fire
	// our custom `fetch` lifecycle event above.
	dispatch,

})

// Decorate the `PresidentUS` class with `connect` and `provideHooks`,
// in that order (it matters).
@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class PresidentUS extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		timer: PropTypes.object.isRequired,
		results: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
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
			const allStates = races
				// return the first item of reportingUnits,
				.map(v => (v.reportingUnits || [])[0])
				// and don't include null items.
				.filter(v => v)

			// Get US presidential race summary.
			const summaryState = _.find(allStates, { statePostal: 'US' }) || {}

			// Check if all results are in.
			const isFinished = +summaryState.precinctsReportingPct === 100

			if (isFinished) {
				cancelTimer()
			} else {
				startTimer()
			}

		}

	}

	// Wrap the `fetch` call in a simpler `fetchData` function.
	fetchData = () => {
		hooks.fetch({ dispatch: this.props.dispatch })
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

		// Get US race:
		const allStates = races
			// return the first item of reportingUnits,
			.map(v => (v.reportingUnits || [])[0])
			// and don't include null items.
			.filter(v => v)

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get US presidential race summary.
		const summaryState = _.find(allStates, { statePostal: 'US' })

		// Define the candidates we're interested in.
		const mainCandidatePolIDs = ['1746', '8639', '31708', '895']

		// Get summary US candidates, so we can sort by them.
		const summaryStateCandidates = summaryState ?
			sortByElectoralCount(summaryState.candidates)
			.map(v => ({
				...v,
				isMainCandidate: _.includes(mainCandidatePolIDs, v.polID),
			})) : []

		// Prepare the US race so it can be easily ingested by sub-components:
		const states = _(allStates)
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

		// Finally we can render all the components!
		return (
			<div className='PresidentUS'>

				<TestStatus isTest={isTest} />

				<Header summaryState={summaryState} />
				<main id='content'>
					<h1>PresidentUS</h1>

					<Timer {...timerProps} />

					<Map
						topoObject={STATES}
						data={states}
						sortingDelegate={sortByElectoralCount}
						projection={geoAlbersUsa()}
						unitName='statePostal' />

					<StateResultsTable
						{...{ states, summaryCandidates: summaryStateCandidates }} />
				</main>

				<Footer />

			</div>
		)

	}

}

export default PresidentUS
