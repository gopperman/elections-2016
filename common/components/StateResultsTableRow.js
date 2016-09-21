import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const StateResultsTableRow = ({ statePostal, precinctsReportingPct,
candidates }) =>
	<tr>
		<td>
			<div>{statePostal}</div>
			<div>{precinctsReportingPct}%</div>
		</td>
		{ candidates.map((v, i) => (
			<td key={i}>
				<div>{percentForDisplay(percent({
					candidates, candidateID: v.candidateID }))}%</div>
				<div>{addCommas(v.voteCount)}</div>
				<div>{v.last}</div>
			</td>
		))}
	</tr>

StateResultsTableRow.propTypes = {
	candidates: PropTypes.array.isRequired,
	statePostal: PropTypes.string.isRequired,
	precinctsReportingPct: PropTypes.string.isRequired,
}

export default StateResultsTableRow
