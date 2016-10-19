// The `StateResultsTableRow` class displays detailed results for a state
// row within a `StateResultsTableRow`.

import React, { PropTypes } from 'react'
import _ from 'lodash'

import addCommas from 'add-commas'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const StateResultsTableRow = ({ statePostal, stateName,
precinctsReportingPct, candidates, summaryCandidates }) =>
	<tr className='r-table__row'>
		<td className='r-table__cell'>
			<p className='benton-bold'>
				<abbr>{statePostal}</abbr>
				<span className='full'>{stateName}</span>
			</p>
			<p className='benton-regular'>{+precinctsReportingPct}%</p>
		</td>
		{ summaryCandidates
			.filter(v => v.isMainCandidate)
			.map((v, i) => {

				// Find this summary candidate in this state.
				const candidate = _.find(candidates, { polID: v.polID })

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

StateResultsTableRow.propTypes = {
	summaryCandidates: PropTypes.array.isRequired,
	candidates: PropTypes.array.isRequired,
	statePostal: PropTypes.string.isRequired,
	stateName: PropTypes.string.isRequired,
	precinctsReportingPct: PropTypes.string.isRequired,
}

export default StateResultsTableRow
