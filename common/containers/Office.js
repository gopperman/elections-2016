/* eslint-disable max-len */

// The `Office` class displays summary results for all races
// of this office.

import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as actions from './../actions/actionCreators.js'
import Timer from './../components/Timer.js'
import Header from './../components/templates/Header.js'
import Footer from './../components/templates/Footer.js'
import TestStatus from './../components/TestStatus.js'
import ResultBar from './../components/ResultBar.js'
import { sortByVoteCount } from './../utils/Candidates.js'

const flourish = `
	<svg version="1.1" id="icon-chart" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="46px" height="54px" viewBox="0 0 46 54" enable-background="new 0 0 46 54" xml:space="preserve" aria-labelledby="chart-title">
		<title id="chart-title">Chart</title>
		<rect y="17" width="10" height="37"></rect>
		<rect x="18" width="10" height="54"></rect>
		<rect x="36" y="27" width="10" height="27"></rect>
	</svg>
`

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?statePostal=M'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeName='

// This object, used by the `@provideHooks` decorator, defines our custom
// data loading dependencies. At the moment we just have one: `fetch`. It
// gets triggered on both server and client.
const hooks = {

	// `fetch` takes a `dispatch` argument, which we will use to fire
	// our custom data loading actions. In this case, we dispatch the
	// `fetchResults` action.
	fetch: ({ dispatch, params }) => {
		const fullUrl = `${url}${params.officeName}`
		return dispatch(actions.fetchResults({ url: fullUrl }))
	},
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

// Decorate the class with `connect` and `provideHooks`,
// in that order (it matters).
@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class Office extends Component {

	static propTypes = {
		params: PropTypes.object.isRequired,
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

			// For each race,
			const anyIncompleteRaces = _(races)
				// get its reportingUnits array,
				.map('reportingUnits')
				// try to find the state-level reporting unit,
				.map(v => _.find(v, { level: 'state' }))
				// and see if there is at least one at less than 100% pct.
				.some(v => +v.precinctsReportingPct < 100)

			if (!anyIncompleteRaces) {
				cancelTimer()
			} else {
				startTimer()
			}

		}

	}

	// Wrap the `fetch` call in a simpler `fetchData` function.
	fetchData = () => {
		const { dispatch, params } = this.props
		hooks.fetch({ dispatch, params })
	}

	render() {

		const { props, fetchData } = this
		const { timer, params, results } = props
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
		const isTest = _.some(data.races, 'test')

		const title = params.officeName

		const raceBlocks = races.map((v, i) => {

			const stateUnit =
				_.find(v.reportingUnits, { level: 'state' }) || {}

			const candidates = stateUnit.candidates || []

			const candidateBlocks = sortByVoteCount(candidates)
				.map((candidate, key) =>
					<ResultBar {...{ key, candidate, candidates }} />)

			return (
				<div key={i}>
					<h2 className='benton-bold'>{v.seatName}</h2>
					{candidateBlocks}
				</div>
			)

		})

		// Finally we can render all the components!
		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<div className='hero lead-bg'>
						<h1 className='hed hero__hed benton-bold'>{title}</h1>
						<div
							className='hero__flourish'
							dangerouslySetInnerHTML={{ __html: flourish }} />
					</div>

					<div className='container'>

						<Timer {...timerProps} />

						{raceBlocks}

					</div>

				</main>

				<Footer />

			</div>
		)

	}
}

export default Office
