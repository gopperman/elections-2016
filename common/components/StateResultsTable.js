// The `StateResultsTable` class displays detailed results for each
// state in the race.

import React, { PropTypes } from 'react'
import StateResultsTableRow from './StateResultsTableRow.js'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the states down the left hand side for the ${raceName}.`

const StateResultsTable = ({ states, summaryCandidates }) =>
	<div>
		<h1>State by state results</h1>
		<table summary={createSummary()}>
			<thead>
				<tr>
					<th scope='col'>
						<div>State</div>
						<div>Precincts reporting</div>
					</th>
					{ summaryCandidates.map((v, i) => (
						<th scope='col' key={i}>
							<div>{v.last}</div>
							<div>{i === 0 ? 'Votes' : ''}</div>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{ states.map((state, key) => (
					<StateResultsTableRow key={key} {...state} />
				))}
			</tbody>
		</table>
	</div>

StateResultsTable.propTypes = {
	states: PropTypes.array.isRequired,
	summaryCandidates: PropTypes.array.isRequired,
}

export default StateResultsTable
