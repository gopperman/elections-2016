// The `TownResultsTableRow` class displays detailed results for a town row
// within a `TownResultsTable`.

import React, { PropTypes } from 'react'
import _ from 'lodash'
import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const TownResultsTableRow = ({ reportingunitName, precinctsReporting,
precinctsTotal, candidates, summaryCandidates }) =>
	<tr className='r-table__row'>
		<td className='r-table__cell'>
			<p className='benton-bold'>{reportingunitName}</p>
			<p className='benton-regular'>{precinctsReporting} of {precinctsTotal}</p>
		</td>
		{ summaryCandidates.map((v, i) => {

			// Find this summary candidate in this town.
			const candidate = _.find(candidates, { candidateID: v.candidateID })

			return candidate ? (
				<td className='r-table__cell' key={i}>
					<p className='hide-accessible'>{candidate.last}</p>
					<p className='benton-bold'>{+percentForDisplay(percent({
						candidates, candidateID: candidate.candidateID }))}%</p>
					<p className='benton-regular'>{addCommas(candidate.voteCount)}</p>
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
