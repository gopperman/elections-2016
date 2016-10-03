// The `TownResultsTableRow` class displays detailed results for a town row
// within a `TownResultsTable`.

import React, { PropTypes } from 'react'
import _ from 'lodash'
import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const TownResultsTableRow = ({ reportingunitName, precinctsReporting,
precinctsTotal, candidates, summaryCandidates }) =>
	<tr>
		<td>
			<div>{reportingunitName}</div>
			<div>{precinctsReporting} of {precinctsTotal}</div>
		</td>
		{ summaryCandidates.map((v, i) => {

			// Find this summary candidate in this town.
			const candidate = _.find(candidates, { candidateID: v.candidateID })

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

TownResultsTableRow.propTypes = {
	summaryCandidates: PropTypes.array.isRequired,
	candidates: PropTypes.array.isRequired,
	reportingunitName: PropTypes.string.isRequired,
	precinctsReporting: PropTypes.number.isRequired,
	precinctsTotal: PropTypes.number.isRequired,
}

export default TownResultsTableRow
