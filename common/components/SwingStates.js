import React, { PropTypes } from 'react'
import SwingState from './SwingState.js'

const SwingStates = ({ states }) => {

	const circles = states.map((state, key) =>
		<SwingState {...{ state, key }} />)

	return (
		<div className="container-sm">
			<div className='r-row'>
				{circles}
			</div>
		</div>
	)

}

SwingStates.propTypes = {
	states: PropTypes.array.isRequired,
}

export default SwingStates
