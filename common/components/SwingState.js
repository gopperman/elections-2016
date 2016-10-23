import React, { PropTypes } from 'react'
import chooseColorClass from './../utils/chooseColorClass.js'

const SwingState = ({ state }) => {

	const { statePostal, candidates, precinctsReportingPct } = state

	const colorClass = chooseColorClass({
		candidates: candidates || [],
		precinctsReportingPct,
	})

	console.log(colorClass)

	return (
		<div className='r-block'>
			<p className='r-block__name--small benton-bold'>{statePostal}</p>
			<div
				className='results-circle stripe-dem'
				role='progressbar'
				aria-valuenow={79.7}
				aria-valuemin='0'
				aria-valuemax='100'>
				<p className='r-block__meta benton-bold'>+4%</p>
			</div>
		</div>
	)

}

SwingState.propTypes = {
	state: PropTypes.object.isRequired,
}

export default SwingState
