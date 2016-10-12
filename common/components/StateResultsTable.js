// The `StateResultsTable` class displays detailed results for each
// state in the race.

import React, { PropTypes } from 'react'
import StateResultsTableRow from './StateResultsTableRow.js'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the states down the left hand side for the ${raceName}.`

const StateResultsTable = ({ states, summaryCandidates }) =>
	<div className='r-block'>
		<table className='r-table' summary={createSummary()}>
			<thead className='r-table__head'>
				<tr className='r-table__row'>
					<th className='r-table__cell'>
						<p className='benton-bold'>State</p>
						<p className='benton-regular'>Pcnts. reporting</p>
					</th>
					{ summaryCandidates
						.filter(v => v.isMainCandidate)
						.map((v, i) => (
							<th scope='col' className='r-table__cell' key={i}>
								<p className='benton-bold'>{v.last}</p>
								<p className='benton-regular'>{i === 0 ? 'Votes' : ''}</p>
							</th>
					))}
				</tr>
			</thead>
			<tbody>
				{ states.map((state, key) => (
					<StateResultsTableRow
						{...{ key, ...state, summaryCandidates }} />
				))}
			</tbody>
		</table>
	</div>

StateResultsTable.propTypes = {
	states: PropTypes.array.isRequired,
	summaryCandidates: PropTypes.array.isRequired,
}

export default StateResultsTable
