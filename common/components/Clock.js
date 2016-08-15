import React, { Component, PropTypes } from 'react'

class Clock extends Component {

	static propTypes = {

		// actions
		startTimer: PropTypes.func,
		stopTimer: PropTypes.func,

		// state
		startedAt: PropTypes.number,

		// not sure where this belongs
		// but it doesn't feel right to put it here
		isFetching: PropTypes.bool,

	}

	componentDidUpdate = (prevProps) => {

		const { isFetching, startTimer } = this.props

		// did we just go from fetching to not fetching,
		// i.e., did our fetchResults complete?
		if (!isFetching && prevProps.isFetching) {

			startTimer()

		}

	}

	render() {

		return (
			<div className='Clock'>
				Clock
			</div>
		)

	}

}
export default Clock
