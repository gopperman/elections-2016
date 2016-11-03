import React, { PropTypes } from 'react'
import SwingState from './SwingState.js'

const SwingStates = ({ states }) => {

	const circles = states.map((state, key) =>
		<SwingState {...{ state, key }} />)

	return (
			<div>
				<h3 className='overline benton-bold'>States to watch</h3>
				<div className='r-row--circle'>
					{circles}
				</div>
			</div>
	)

}

SwingStates.propTypes = {
	states: PropTypes.array.isRequired,
}

export default SwingStates
