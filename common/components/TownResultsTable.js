// The `TownResultsTable` class displays detailed results for each
// town in the race.

import _ from 'lodash'
import React, { PropTypes } from 'react'
import { sortByVoteCount } from './../utils/Candidates.js'
import { getRaceUnits } from './../utils/dataUtil.js'
import TownResultsTableRow from './TownResultsTableRow.js'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the towns down the left hand side for the ${raceName}.`

const TownResultsTable = ({ race }) => {

	// Get this race's reporting units.
	const units = getRaceUnits(race)

	// Get the statewide unit.
	const state = _.find(units, { level: 'state' })

	// Get statewide candidates.
	const summaryCandidates = sortByVoteCount(state.candidates)

	// Get the town units.
	const towns = _.filter(units, { level: 'subunit' })

	// Create the town rows.
	const rows = _.sortBy(towns, 'reportingunitName').map((town, key) => (
		<TownResultsTableRow {...{ town, summaryCandidates, key }} />
	))

	return (
		<div>
			<h1>Town by town results</h1>
			<table summary={createSummary()}>
				<thead>
					<tr>
						<th scope='col'>
							<div>Town</div>
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

TownResultsTable.propTypes = {
	race: PropTypes.object.isRequired,
}

export default TownResultsTable
