// The `TownResultsTableRow` class displays detailed results for a town row
// within a `TownResultsTable`.

import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const TownResultsTableRow = ({ reportingunitName, precinctsReporting,
precinctsTotal, candidates }) =>
	<tr>
		<td>
			<div>{reportingunitName}</div>
			<div>{precinctsReporting} of {precinctsTotal}</div>
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

TownResultsTableRow.propTypes = {
	candidates: PropTypes.array.isRequired,
	reportingunitName: PropTypes.string.isRequired,
	precinctsReporting: PropTypes.string.isRequired,
	precinctsTotal: PropTypes.string.isRequired,
}

export default TownResultsTableRow
