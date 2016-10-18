import React, { PropTypes } from 'react'
import chooseColorClass from './../utils/chooseColorClass.js'
import { sortByElectoralCount } from './../utils/Candidates.js'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

// TODO: add leading vs winner precincts reporting
const SwingStates = ({ states }) => {

	const circles = states.map((state, i) => {

		const { statePostal } = state
		const candidates = sortByElectoralCount(state.candidates)

		const klass = chooseColorClass({
			candidates,
		})

		// Get the vote pct. margin by looking at the first two candidates.
		const percents = candidates.map(candidate =>
			percent({ candidates, candidateID: candidate.candidateID }))

		const margin = percentForDisplay(percents[0] - percents[1], true)

		return (
			<li key={i}>
				<div>State: {statePostal}</div>
				<div>Party: {klass}</div>
				<div>Won: {candidates[0].party}</div>
				<div>Margin: +{margin}%</div>
			</li>
		)
	})

	return (
		<div className='SwingStates'>
			<h1>Swing states</h1>
			<ul>{ circles }</ul>
		</div>
	)

}

SwingStates.propTypes = {
	states: PropTypes.array.isRequired,
}

export default SwingStates
