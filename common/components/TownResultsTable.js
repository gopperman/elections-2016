// The `TownResultsTable` class displays detailed results for each
// town in the race.

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import TownResultsTableRow from './TownResultsTableRow.js'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the towns down the left hand side for the ${raceName}.`

const TownResultsTable = ({ towns, summaryCandidates }) =>
	<div>
		<h1>Town by town results</h1>
		<table summary={createSummary()}>
			<thead>
				<tr>
					<th scope='col'>
						<div>Town</div>
						<div>Precincts reporting</div>
					</th>
					{ summaryCandidates.map((candidate, i) => {

						const { winner, last } = candidate

						const candidateClass =
							classnames('benton-bold', { 'is-winner': !!winner })

						return (
							<th scope='col' key={i}>
								<div className={candidateClass}>{last}</div>
								<div>{i === 0 ? 'Votes' : ''}</div>
							</th>
						)
					})
				}
				</tr>
			</thead>
			<tbody>
				{ towns.map((town, key) => (
					<TownResultsTableRow
						{...{ key, ...town, summaryCandidates }} />
				))}
			</tbody>
		</table>
	</div>

TownResultsTable.propTypes = {
	towns: PropTypes.array.isRequired,
	summaryCandidates: PropTypes.array.isRequired,
}

export default TownResultsTable
