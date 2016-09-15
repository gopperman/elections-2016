// The `StateResultsTable` className displays detailed results for each
// state in the race.

import React, { PropTypes } from 'react'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the states down the left hand side for the ${raceName}.`

const StateResultsTable = ({ race }) => {

	console.log(race)

	// How do we decide on a sorting order for these candidates?
	// By electoral leading? electoral won?

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

					</tr>
				</thead>
			</table>
		</div>
	)
}

StateResultsTable.propTypes = {
	race: PropTypes.object.isRequired,
}

export default StateResultsTable
