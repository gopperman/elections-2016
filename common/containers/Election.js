import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import Timer from './../components/Timer.js'
import Map from './../components/Map.js'
import Header from './../components/templates/Header.js'
import Footer from './../components/templates/Footer.js'
import {
	getPresidentSummaryState,
} from './../utils/dataUtil.js'
import {
	getUSMapArguments,
} from './../utils/Map.js'

const hooks = {
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url: 'election' })),
}

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class Election extends Component {

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
	// NOTE: the switcher triggers this.

	componentDidUpdate = (prevProps) => {

		const { props } = this
		const { startTimer, cancelTimer } = props.actions
		const { results } = props

		// Did we stop fetching - that is, did we go from `isFetching == true`
		// to `isFetching == false`? If so:
		if (prevProps.results.isFetching && !props.results.isFetching) {

			// Get API results.
			const usRace = results.data['president-us-states']

			// Get summary US race.
			const summaryState = getPresidentSummaryState(usRace)

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
	onClick = () => {
		setTimeout(() => this.fetchData(), 1000)
	}

	fetchData = () => {
		hooks.fetch({ dispatch: this.props.dispatch })
	}

	render() {
		const { props, fetchData } = this
		const { timer, results } = props
		const { stopTimer } = props.actions

		// Prepare the US race so it can be easily ingested by sub-components:
		const usRace = results.data['president-us-states']

		// Get summary US race.
		const summaryState = getPresidentSummaryState(usRace)

		const mapArgs = getUSMapArguments(usRace)

		return (
			<div className='Election'>
				<Header summaryState={summaryState} />
				<h1>Election Home</h1>

				<Map {...mapArgs} />

				<Footer />
			</div>
		)

	}

}

export default Election
