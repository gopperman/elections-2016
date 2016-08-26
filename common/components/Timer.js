import React, { Component, PropTypes } from 'react'
import { interval } from 'd3-timer'

const DURATION = 3 * 1000

class Timer extends Component {

	static propTypes = {
		status: PropTypes.string.isRequired,
		startedAt: PropTypes.number,
		callback: PropTypes.func.isRequired,
	}

	componentDidMount = () => {
		this.interval = interval(() => {
			this.forceUpdate()
		}, 100)
	}

	componentDidUpdate = () => {

		const { status, startedAt, callback } = this.props

		// did we run out of time?
		if (status === Timer.status.RUNNING &&
				(Date.now() - startedAt >= DURATION)) {
			// call parent callback
			callback()
		}

	}

	componentWillUnmount = () => {
		this.interval.stop()
	}

	render() {

		const { status, startedAt } = this.props

		const { CANCELED, RUNNING, STOPPED } = Timer.status

		let message
		switch (status) {

			case CANCELED:
				message = ''
				break

			case RUNNING: {

				// use Math.max to make sure we never display a negative number
				const timeLeft = Math.max(
					Math.round((DURATION - (Date.now() - startedAt)) / 1000), 0)

				message = `update in ${timeLeft}`
				break

			}

			case STOPPED:
				message = 'loading'
				break

			default:
				message = ''
				break

		}

		return (
			<div className='Timer'>
				Timer
				<p>Status: {status}</p>
				<p>Message: {message}</p>
			</div>
		)

	}

}

Timer.status = {
	CANCELED: 'canceled',
	RUNNING: 'running',
	STOPPED: 'stopped',
}

export default Timer
