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
import MassMap from './../components/MassMap.js'
import UsMap from './../components/UsMap.js'
import {
	formatElectoralSummary,
} from './../utils/standardize.js'
import { sortByElectoralCount } from './../utils/Candidates.js'

// import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
// import ElectoralCollegeMap from './../components/ElectoralCollegeMap.js'

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
	componentDidUpdate = (prevProps) => {

		const { props } = this
		const { startTimer, cancelTimer } = props.actions

		// Did we stop fetching - that is, did we go from `isFetching == true`
		// to `isFetching == false`? If so,
		if (prevProps.results.isFetching && !props.results.isFetching) {

			// check to see if all results are in so we can stop the clock.

			// TODO: implement
			++this.count

			if (this.count > 2) {
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

	// TODO: remove when we implement data completion check.
	count = 0

	handleSwitcher = () => {
		this.setState({ showUS: !this.state.showUS })
	}

	render() {

		const { props, fetchData } = this
		const { timer, results, selection } = props
		const { stopTimer, selectFeature } = props.actions
		const { showUS } = this.state

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

		// TODO: before bringing these back, make sure they reference data
		// safely.
		// <ElectoralCollegeBar data={results.data['president-us']} />
		// <ElectoralCollegeMap data={results.data['president-us-states']} />

		// Get fake API results.
		const massRace = results.data['president-ma-towns']
		const statesRace = results.data['president-us-states']

		// TODO: this endpoint doesn't give us all candidates, just the top two.
		// This might be problematic if we want to show third-party candidates
		// in the state-by-state results table.
		const usRace = formatElectoralSummary(
			results.data['president-us'].Sumtable)

		// Create an array of ordered presidential candidates:
		const summaryCandidates = sortByElectoralCount(
			_.filter(usRace.candidates, 'candidateID'))

		let switcherText
		let map
		let table

		if (showUS) {

			switcherText = 'Switch to MASS'
			map = <UsMap {...{ selection, selectFeature, race: statesRace }} />
			table = (<StateResultsTable
				{...{ race: statesRace, summaryCandidates }} />)

		} else {

			switcherText = 'Switch to US'
			map = <MassMap {...{ selection, selectFeature, race: massRace }} />
			table = <TownResultsTable {...{ race: massRace }} />

		}

		// Finally we can render all the components!
		return (
			<div className='President'>
				<h1>President</h1>
				<Timer {...timerProps} />
				<button onClick={this.handleSwitcher}>{switcherText}</button>
				{map}
				{table}
			</div>
		)

	}

}

export default President
