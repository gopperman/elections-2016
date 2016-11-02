import React, { PropTypes } from 'react'
import usAbbreviations from 'us-abbreviations'
import chooseColorClass from './../utils/chooseColorClass.js'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'
import { sortByElectoralCount } from './../utils/Candidates.js'

const SwingState = ({ state }) => {

	const { statePostal, precinctsReportingPct } = state

	const candidates = sortByElectoralCount(state.candidates)

	const colorClass = chooseColorClass({
		candidates: candidates || [],
		precinctsReportingPct,
	})

	const first = candidates[0] || {}
	const second = candidates[1] || {}

	const firstPct =
		percent({ candidateID: first.candidateID, candidates })
	const secondPct =
		percent({ candidateID: second.candidateID, candidates })

	const margin = percentForDisplay(firstPct - secondPct, true)

	const convertStateToAP = usAbbreviations('postal', 'ap')
	const stateDisplayName = convertStateToAP(statePostal.toUpperCase())

	return (
		<div className='r-block'>
			<p className='r-block__name--small benton-bold'>{stateDisplayName}</p>
			<div
				className={`results-circle ${colorClass}`}
				role='progressbar'
				aria-valuenow={margin}
				aria-valuemin='0'
				aria-valuemax='100'>
				<p className='r-block__meta benton-bold'>+{margin}%</p>
			</div>
		</div>
	)

}

SwingState.propTypes = {
	state: PropTypes.object.isRequired,
}

export default SwingState
