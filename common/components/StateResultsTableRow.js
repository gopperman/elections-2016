import _ from 'lodash'
import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'
import { sortByIDs } from './../utils/Candidates.js'

const StateResultsTableRow = ({ state, summaryCandidates }) => {

	// Get this state's candidates
	const { candidates } = state

	// Get candidate ids for the overall candidates (winner order).
	const candidateIDs = _.map(summaryCandidates, 'candidateID')

	// Sort the state candidates by overall order.
	const sortedCandidates = sortByIDs({ candidates, candidateIDs })

	// Create the candidate tds.
	const tds = sortedCandidates.map((candidate, i, array) => {

		const { candidateID, voteCount } = candidate

		// Add appropriate commas to the candidate's vote count.
		const vote = addCommas(voteCount)

		// Get the candidate's vote percent.
		const pct = percent({ candidates: array, candidateID })

		// Get the display-ready version of the percent.
		const pctForDisplay = percentForDisplay(pct)

		return (
			<td key={i}>
				<div>{pctForDisplay}%</div>
				<div>{vote}</div>
			</td>
		)

	})

	// Create the entire row.
	return (
		<tr>
			<td>
				<div>{state.statePostal}</div>
				<div>{state.precinctsReportingPct}%</div>
			</td>
			{tds}
		</tr>
	)
}

StateResultsTableRow.propTypes = {
	state: PropTypes.object.isRequired,
	summaryCandidates: PropTypes.array.isRequired,
}

export default StateResultsTableRow
