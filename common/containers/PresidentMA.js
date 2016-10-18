// The `PresidentMA` class displays presidential results for MA.

import { geoConicConformal } from 'd3-geo'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import Header from './../components/templates/Header.js'
import Footer from './../components/templates/Footer.js'
import Timer from './../components/Timer.js'
import TownResultsTable from './../components/TownResultsTable.js'
import Map from './../components/Map.js'
import TOWNS from './../../data/output/TOWNS.json'
import TestStatus from './../components/TestStatus.js'

import {
	sortByVoteCount,
	sortByCandidateIDs,
} from './../utils/Candidates.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '016-11-08?officeID=P&statePostal=US,MA&level=ru'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeID=P&statePostal=US,MA&level=ru'

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

// Decorate the `PresidentMA` class with `connect` and `provideHooks`,
// in that order (it matters).
@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class PresidentMA extends Component {

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
		// to `isFetching == false`? If so,
		if (prevProps.results.isFetching && !props.results.isFetching) {

			// Get the data - or an empty object.
			const data = results.data || {}

			// Get API results.
			const races = data.races || []

			// Get the US and MA races.
			const usRace = _.find(races, { statePostal: 'US' }) || {}
			const maRace = _.find(races, { statePostal: 'MA' }) || {}

			// Get the overall units.
			const usUnit =
				_.find(usRace.reportingUnits, { level: 'national' }) || {}
			const maUnit =
				_.find(maRace.reportingUnits, { level: 'national' }) || {}

			// Check if all results are in.
			const isFinished = +usUnit.precinctsReportingPct === 100 &&
				+maUnit.precinctsReportingPct === 100

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

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get the US and MA races.
		const usRace = _.find(races, { statePostal: 'US' }) || {}
		const maRace = _.find(races, { statePostal: 'MA' }) || {}

		// Get the overall units.
		const usUnit =
			_.find(usRace.reportingUnits, { level: 'national' }) || {}
		const maUnit =
			_.find(maRace.reportingUnits, { level: 'national' }) || {}

		// Get summary MA candidates, so we can sort by them.
		const summaryTownCandidates = sortByVoteCount(maUnit.candidates)

		// Prepare the MA race so it can be easily ingested by sub-components:
		const towns = _(maRace.reportingUnits)
			// don't include summary town,
			.reject({ level: 'national' })
			// sort towns by their full name,
			.sortBy('reportingunitName')
			.map(v => ({
				...v,
				// and sort candidates by overall candidates.
				candidates: sortByCandidateIDs({
					candidates: v.candidates,
					candidateIDs: _.map(summaryTownCandidates, 'candidateID'),
				}),
			}))
			.value()

		// Setup a MA-centric projection.
		const massProjection = geoConicConformal()
			.parallels([41 + (43 / 60), 42 + (41 / 60)])
			.rotate([71 + (30 / 60), -41])

		// Finally we can render all the components!
		return (
			<div className='PresidentMA'>

				<TestStatus isTest={isTest} />

				<Header summaryState={usUnit} />
				<h1>PresidentMA</h1>

				<Timer {...timerProps} />

				<Map
					topoObject={TOWNS}
					data={towns}
					sortingDelegate={sortByVoteCount}
					projection={massProjection}
					dropdownName='town'
					unitName='reportingunitName' />

				<TownResultsTable
					{...{ towns, summaryCandidates: summaryTownCandidates }} />

				<Footer />

			</div>
		)

	}

}

export default PresidentMA
