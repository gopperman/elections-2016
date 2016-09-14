// The `DetailedResultsTable` className displays detailed results for each
// reporting unit in the race.

import _ from 'lodash'
import React, { PropTypes } from 'react'
import { sort } from './../utils/Candidates.js'
import { getRaceUnits } from './../utils/dataUtil.js'
import { toSentenceCase } from './../utils/standardize.js'
import DetailedResultsTableRow from './DetailedResultsTableRow.js'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the town or counties down the left hand side for the ${raceName}.`

const DetailedResultsTable = ({ data, unitName }) => {

	// Get this race's reporting units.
	const units = getRaceUnits(data)

	// Get the statewide unit.
	const state = _.find(units, { level: 'state' })

	// Get statewide candidates.
	const summaryCandidates = sort(state.candidates)

	// Get the subunits (town or counties).
	const subunits = _.filter(units, { level: 'subunit' })

	// Create the subunit rows.
	const rows = _.sortBy(subunits, 'reportingunitName').map((unit, key) => (
		<DetailedResultsTableRow
			{...{ unit, summaryCandidates, key }}
		/>
	))

	return (
		<div>
			<h1>{toSentenceCase(`${unitName} by ${unitName} results`)}</h1>
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

DetailedResultsTable.propTypes = {
	data: PropTypes.object.isRequired,
	unitName: PropTypes.string.isRequired,
}

export default DetailedResultsTable
