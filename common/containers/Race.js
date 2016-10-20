/* eslint-disable max-len */

// The `Race` class displays race results.

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './../actions/actionCreators.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import TownResultsTable from './../components/TownResultsTable.js'
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
const url = '2016-11-08?statePostal=MA&level=ru'

// This object, used by the `@provideHooks` decorator, defines our custom
// data loading dependencies. At the moment we just have one: `fetch`. It
// gets triggered on both server and client.
const hooks = {

	// `fetch` takes a `dispatch` argument, which we will use to fire
	// our custom data loading actions. In this case, we dispatch the
	// `fetchResults` action.
	fetch: ({ dispatch, params }) => {

		const { officeName, seatName } = params
		const fullUrl = `${url}&officeName=${officeName}&seatName=${seatName}`
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
class Race extends Component {

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

		// did we stop fetching?
		if (prevProps.results.isFetching && !props.results.isFetching) {

			// Get the data - or an empty object.
			const data = results.data || {}

			// Get API results.
			const race = data.races && data.races.length ? data.races[0] : {}

			// Get state.
			const state =
				_.find(race.reportingUnits, { level: 'state' }) || {}

			// Check if all results are in.
			const isFinished = +state.precinctsReportingPct === 100

			if (isFinished) {
				cancelTimer()
			} else {
				startTimer()
			}

		}

	}

	fetchData = () => {

		const { dispatch, params } = this.props
		hooks.fetch({ dispatch, params })

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
		const race = data.races && data.races.length ? data.races[0] : {}

		// Get test status.
		const isTest = _.some(data.races, 'test')

		// Get state.
		const state =
			_.find(race.reportingUnits, { level: 'state' }) || {}

		// Get towns.
		const towns = _(race.reportingUnits)
			.filter({ level: 'subunit' })
			.value()

		// Get summary candidates.
		const summaryCandidates = sortByVoteCount(state.candidates || [])

		// Create summary candidate blocks.
		const candidateBlocks = summaryCandidates
			.map((candidate, key) =>
				<ResultBar {...{ key, candidate, candidates: summaryCandidates }} />)

		// Get race title.
		const { officeName, seatName } = race
		const title = [officeName, seatName].filter(v => v).join(', ')

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

					<div className='container-lg'>
						<Timer {...timerProps} />

						<div>
							<h2 className='benton-bold'>{title}</h2>
							{candidateBlocks}
						</div>

					</div>

					<div className='container-downpage'>
						<TownResultsTable {...{ towns, summaryCandidates }} />
					</div>

				</main>

				<Footer />

			</div>
		)

	}

}

export default Race
