// The `Timer` class is a finite state machine that displays seconds left
// until next action (whatever that may be).

import React, { Component, PropTypes } from 'react'
import { interval } from 'd3-timer'
import dateline from 'dateline'

const DURATION = 15 * 1000

class Timer extends Component {

	static propTypes = {
		status: PropTypes.string.isRequired,
		startedAt: PropTypes.number,
		callback: PropTypes.func.isRequired,
		timestamp: PropTypes.instanceOf(Date),
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs. We will use it to create a new `interval` which
	// will call `this.forceUpdate` every 100ms.
	componentDidMount = () => {
		this.interval = interval(() => {
			this.forceUpdate()
		}, 100)
	}

	// This gets called once after the component's updates are flushed to DOM.
	// We will use it to determine if we ran out of time.
	componentDidUpdate = () => {

		const { status, startedAt, callback } = this.props

		// Is the timer running, and we ran out of time?
		if (status === Timer.status.RUNNING &&
				(Date.now() - startedAt >= DURATION)) {

			// Then call the user-supplied `callback`.
			callback()
		}

	}

	// This gets called once immediately before the component is unmounted
	// from the DOM. This is a good place to stop the `interval` timer.
	componentWillUnmount = () => {
		this.interval.stop()
	}

	render() {

		const { status, startedAt, timestamp } = this.props
		const { CANCELED, RUNNING, STOPPED } = Timer.status
		let message

		// The `render` function will display different messages, depending
		// on the `Timer` state.
		switch (status) {

			// If `CANCELED`, don't display anything.
			case CANCELED:
				message = 'All results in'
				break

			// If `RUNNING`, display time left until `callback`.
			case RUNNING: {

				// Use Math.max to make sure we never display a negative number.
				const timeLeft = Math.max(
					Math.round((DURATION - (Date.now() - startedAt)) / 1000), 0)

				message = `Update in ${timeLeft}`
				break

			}

			// If `STOPPED`, display a loading message.
			case STOPPED:
				message = 'loading'
				break

			default:
				message = ''
				break

		}

		const now = new Date()
		let updated = ''

		if (timestamp) {

			// Create AP-style time.
			const time = dateline(timestamp).getAPTime()

			// Only display date if it's not today.
			const date = (now.toDateString() === timestamp.toDateString()) ?
				null : dateline(timestamp).getAPDate()

			// Join date and time, but not date if it's today.
			const timeAndDate = [date, time].filter(v => v).join(', ')

			updated = `Data last updated ${timeAndDate}`

		}

		return (
			<div className='timer'>
				<p className='timer__elements'>
					<span className='timer__clock benton-bold'>{message}</span>
					<span className='timer__update benton-regular'>{updated}</span>
				</p>
			</div>
		)

	}

}

// These are the finite state machine states.
Timer.status = {
	CANCELED: 'canceled',
	RUNNING: 'running',
	STOPPED: 'stopped',
}

export default Timer
