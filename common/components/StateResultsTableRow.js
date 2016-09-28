// The `StateResultsTableRow` class displays detailed results for a state
// row within a `StateResultsTableRow`.

import React, { PropTypes } from 'react'
import _ from 'lodash'

import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const StateResultsTableRow = ({ statePostal, precinctsReportingPct,
candidates, summaryCandidates }) =>
	<tr>
		<td>
			<div>{statePostal}</div>
			<div>{precinctsReportingPct}%</div>
		</td>
		{ summaryCandidates
			.filter(v => v.isMainCandidate)
			.map((v, i) => {

				// Find this summary candidate in this state.
				const candidate = _.find(candidates, { polID: v.polID })

				return candidate ? (
					<td key={i}>
						<div>{candidate.last}</div>
						<div>{percentForDisplay(percent({
							candidates, candidateID: candidate.candidateID }))}%</div>
						<div>{addCommas(candidate.voteCount)}</div>
					</td>
				) : (<td key={i} />)

			})}

	</tr>

StateResultsTableRow.propTypes = {
	summaryCandidates: PropTypes.array.isRequired,
	candidates: PropTypes.array.isRequired,
	statePostal: PropTypes.string.isRequired,
	precinctsReportingPct: PropTypes.string.isRequired,
}

export default StateResultsTableRow
