// The `StateResultsTable` className displays detailed results for each
// state in the race.

import React, { PropTypes } from 'react'
import StateResultsTableRow from './StateResultsTableRow.js'
import { formatStateAsReportingUnit } from './../utils/standardize.js'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the states down the left hand side for the ${raceName}.`

const StateResultsTable = ({ race, summaryCandidates }) => {

	// TODO: order states by their full name.
	const rows = race.PresStateByStatetable.State
		.map(formatStateAsReportingUnit)
		.map((state, key) => (
			<StateResultsTableRow {...{ state, summaryCandidates, key }} />
		))

	return (
		<div>
			<h1>State by state results</h1>
			<table summary={createSummary()}>
				<thead>
					<tr>
						<th scope='col'>
							<div>State</div>
							<div>Precincts reporting</div>
						</th>
						{ summaryCandidates.map((c, i) => (
							<th scope='col' key={i}>
								<div>{c.last}</div>
								<div>{i === 0 ? 'Votes' : ''}</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
	)
}

StateResultsTable.propTypes = {
	race: PropTypes.object.isRequired,
	summaryCandidates: PropTypes.array.isRequired,
}

export default StateResultsTable
