import React, { Component, PropTypes } from 'react'
import { interval } from 'd3-timer'

const DURATION = 5000

class Clock extends Component {

	static propTypes = {

		// actions
		startTimer: PropTypes.func,
		stopTimer: PropTypes.func,

		// state
		startedAt: PropTypes.number,

		// not sure where these belong
		// but it doesn't feel right to put them here
		isFetching: PropTypes.bool,
		fetchResults: PropTypes.func,

	}

	componentDidMount = () => {
		this.interval = interval(() => {
			this.forceUpdate()
		}, 1000)
	}

	componentDidUpdate = (prevProps) => {

		const { isFetching, startTimer, stopTimer, fetchResults,
			startedAt } = this.props

		// if clock is not running,
		if (!startedAt) {

			// we're either waiting for the results to come back,
			// or they are back, and the race is 100%

			// did we just go from fetching to not fetching,
			// i.e., did our fetchResults complete?
			if (!isFetching && prevProps.isFetching) {

				// if race is complete, do nothing
				// otherwise dispatch startTimer action
				// this will set Date.now() to state
				// TODO: check if race is complete
				startTimer()
			}

		} else if (Date.now() - startedAt >= DURATION) {

			// the clock IS running
			// if it has reached or exceeded the duration, stop it
			// and call fetch results

			stopTimer()
			fetchResults()

		}

	}

	render() {

		const { isFetching, startedAt } = this.props

		const updating = isFetching ? <div>updating</div> : null

		// TODO: display time until next update
		const elapsed = startedAt ?
			<div>Time since clock started: { Date.now() - startedAt }</div> :
			null

		return (
			<div className='Clock'>
				{updating}
				{elapsed}
			</div>
		)

	}

}
export default Clock
