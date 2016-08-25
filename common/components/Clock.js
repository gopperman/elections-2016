import React, { Component, PropTypes } from 'react'
import { interval } from 'd3-timer'

const DURATION = 50 * 1000

class Clock extends Component {

	static propTypes = {

		startTimer: PropTypes.func.isRequired,
		stopTimer: PropTypes.func.isRequired,
		callback: PropTypes.func.isRequired,

		// state
		startedAt: PropTypes.number,
		isWaiting: PropTypes.bool.isRequired,

		// not sure where these belong
		// but it doesn't feel right to put them here
		isDone: PropTypes.bool,

	}

	componentDidMount = () => {
		this.interval = interval(() => {
			this.forceUpdate()
		}, 100)
	}

	componentDidUpdate = (prevProps) => {

		const { isWaiting, startTimer, stopTimer, callback,
			startedAt, isDone } = this.props

		// if clock is not running,
		if (!startedAt) {

			// we're either waiting for the results to come back,
			// or they are back, and the race is 100%

			// did we just go from paused to not paused,
			// i.e., did our callback complete?
			if (!isWaiting && prevProps.isWaiting) {

				// if race is complete, do nothing
				if (!isDone) {

					// otherwise dispatch startTimer action
					// this will set Date.now() to state
					startTimer()

				}

			}

		} else if (Date.now() - startedAt >= DURATION) {

			// the clock IS running
			// if it has reached or exceeded the duration, stop it
			// and call fetch results

			stopTimer()
			callback()

		}

	}

	componentWillUnmount = () => {
		this.interval.stop()
	}

	render() {

		const { isWaiting, startedAt } = this.props

		let timeLeft
		if (startedAt) {

			// use Math.max to make sure we never display a negative number
			timeLeft = Math.max(
				Math.round((DURATION - (Date.now() - startedAt)) / 1000), 0)

		}

		const updating = isWaiting ? <div>updating</div> : null
		const updateIn = startedAt ? <div>update in {timeLeft}</div> : null

		return (
			<div className='Clock'>
				{updating}
				{updateIn}
			</div>
		)

	}

}
export default Clock
