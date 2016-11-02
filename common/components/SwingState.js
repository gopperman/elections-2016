import React, { PropTypes } from 'react'
import usAbbreviations from 'us-abbreviations'
import urlManager from './../utils/urlManager.js'
import chooseColorClass from './../utils/chooseColorClass.js'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const SwingState = ({ state }) => {

	const convertStateToAP = usAbbreviations('postal', 'ap')

	const { statePostal, candidates, precinctsReportingPct } = state

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

	const stateDisplayName = convertStateToAP(urlManager.decode(statePostal).toUpperCase())

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
