import React, { PropTypes } from 'react'
import _ from 'lodash'
import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { sortByIDs } from './../utils/Candidates.js'
import { percentForDisplay } from './../utils/standardize.js'

const DetailedResultsTableRow = ({ unit, summaryCandidates }) => {

	// Get this unit's candidates.
	const { candidates } = unit

	// Get candidate ids for the overall candidates (winner order).
	const candidateIDs = _.map(summaryCandidates, 'candidateID')

	// Sort the unit candidates by overall order.
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
				<div>{unit.reportingunitName}</div>
				<div>{unit.precinctsReporting} of {unit.precinctsTotal}</div>
			</td>
			{tds}
		</tr>
	)
}

DetailedResultsTableRow.propTypes = {
	unit: PropTypes.object.isRequired,
	summaryCandidates: PropTypes.array.isRequired,
}

export default DetailedResultsTableRow
