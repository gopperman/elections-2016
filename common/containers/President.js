// The `President` class displays presidential results for both US and MA.

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import Timer from './../components/Timer.js'
import TownResultsTable from './../components/TownResultsTable.js'
import StateResultsTable from './../components/StateResultsTable.js'

// import MassMap from './../components/MassMap.js'
// import UsMap from './../components/UsMap.js'

// import {
// 	formatElectoralSummary,
// } from './../utils/standardize.js'

import {
	sortByElectoralCount,
	sortByVoteCount,
	sortByPolIDs,
	sortByCandidateIDs,
} from './../utils/Candidates.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'

// This object, used by the `@provideHooks` decorator, defines our custom
// data loading dependencies. At the moment we just have one: `fetch`. It
// gets triggered on both server and client.
const hooks = {

	// `fetch` takes a `dispatch` argument, which we will use to fire
	// our custom data loading actions. In this case, we dispatch the
	// `fetchResults` action.
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url: 'president' })),
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

// Decorate the `President` class with `connect` and `provideHooks`, in that
// order (it matters).
@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class President extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		timer: PropTypes.object.isRequired,
		results: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	state = {
		showUS: true,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs. We will use it to fire the `fetch` hook.
	componentDidMount = () => {
		this.fetchData()
	}

	// This gets called once after the component's updates are flushed to DOM.
	// At the moment we will use it to determine whether to stop the clock.
	// NOTE: the switcher triggers this.
	// componentDidUpdate = (prevProps) => {

// 		const { props } = this
// 		const { cancelTimer } = props.actions

// 		// Did we stop fetching - that is, did we go from `isFetching == true`
// 		// to `isFetching == false`? If so,
// 		if (prevProps.results.isFetching && !props.results.isFetching) {

// 			// check to see if all results are in so we can stop the clock.

// 			cancelTimer()

// 			// if (true) {
// 			// 	cancelTimer()
// 			// } else {
// 			// 	startTimer()
// 			// }

// 		}

	// }

	// Wrap the `fetch` call in a simpler `fetchData` function.
	fetchData = () => {
		hooks.fetch({ dispatch: this.props.dispatch })
	}

	handleSwitcher = () => {
		this.setState({ showUS: !this.state.showUS })
	}

	render() {

		const { props, fetchData } = this
		const { timer, results } = props
		// const { timer, results, selection } = props
		const { stopTimer } = props.actions
		// const { stopTimer, selectFeature } = props.actions
		// const { showUS } = this.state

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

		// Get API results.

		// Get US presidential race.
		const usRace = results.data['president-us-states'].races

		// Get summary US race.
		const summaryState = _.find(usRace, v =>
			v.reportingUnits[0].statePostal === 'US')

		// Get summary US candidates, so we can sort by them.
		const summaryStateCandidates = sortByElectoralCount(
			summaryState.reportingUnits[0].candidates)

		// Prepare the US race so it can be easily ingested by sub-components:
		const states = _(usRace)
			// don't include summary state,
			.reject(v => v.reportingUnits[0].statePostal === 'US')
			// sort states by their full name,
			.sortBy(v => v.reportingUnits[0].stateName)
			.map(v => ({
				...v,
				reportingUnits: v.reportingUnits.map(x => ({
					...x,
					// and sort candidates by overall candidates.
					candidates: sortByPolIDs({
						candidates: x.candidates,
						polIDs: _.map(summaryStateCandidates, 'polID'),
					}),
				})),
			}))
			.value()

		// Get MA presidential race.
		const massRace = results.data['president-ma-towns']
			.races[0].reportingUnits

		// Get summary MA race.
		const summaryTown = _.find(massRace, { level: 'national' })

		// Get summary MA candidates, so we can sort by them.
		const summaryTownCandidates = sortByVoteCount(summaryTown.candidates)

		// Prepare the MA race so it can be easily ingested by sub-components:
		const towns = _(massRace)
			// don't include summary town,
			.reject({ level: 'national' })
			// sort towns by their full name,
			.sortBy('reportingunitName')
			.map(v => ({
				...v,
				candidates: sortByCandidateIDs({
					candidates: v.candidates,
					candidateIDs: _.map(summaryTownCandidates, 'candidateID'),
				}),
			}))
			.value()

		console.log(JSON.stringify(towns, null, 2))

		// // Get fake API results.
		// const usRaceResults = results.data['president-us']
		// const statesRace = results.data['president-us-states']

		// // TODO: this endpoint doesn't give us all candidates, just the top two.
		// // This might be problematic if we want to show third-party candidates
		// // in the state-by-state results table.
		// const usRace = formatElectoralSummary(usRaceResults.Sumtable)

		// // Create an array of ordered presidential candidates:
		// const summaryStateCandidates = sortByElectoralCount(
		// 	_.filter(usRace.candidates, 'candidateID'))

		// let switcherText
		// let map
		// let table

		// if (showUS) {

		// 	switcherText = 'Switch to MASS'
		// 	map = <UsMap {...{ selection, selectFeature, race: statesRace }} />
		// 	table = (<StateResultsTable
		// 		{...{ race: statesRace, summaryStateCandidates }} />)

		// } else {

		// 	switcherText = 'Switch to US'
		// 	map = <MassMap {...{ selection, selectFeature, race: massRace }} />
		// 	table = <TownResultsTable {...{ race: massRace }} />

		// }

				// <button onClick={this.handleSwitcher}>{switcherText}</button>
				// {map}
				// {table}


		// Finally we can render all the components!

		return (
			<div className='President'>
				<h1>President</h1>
				<Timer {...timerProps} />
				<ElectoralCollegeBar {...summaryState} />
				<StateResultsTable
					{...{ states, summaryCandidates: summaryStateCandidates }} />
				<TownResultsTable
					{...{ towns, summaryCandidates: summaryTownCandidates }} />
			</div>
		)

	}

}

export default President
