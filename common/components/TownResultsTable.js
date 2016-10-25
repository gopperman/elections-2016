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
	<div className='r-block'>
		<h3 className='subhed benton-bold'><span>Town Results</span></h3>
		<table className='r-table' summary={createSummary()}>
			<thead className='r-table__head'>
				<tr className='r-table__row'>
					<th className='r-table__cell'>
						<p className='benton-bold'>Town</p>
						<p className='benton-regular'>Precincts reporting</p>
					</th>
					{ summaryCandidates.map((candidate, i) => {

						const { winner, incumbent, last } = candidate

						const candidateClass =
							classnames('benton-bold', { 'is-winner': !!winner })

						const incumbentSpan = incumbent ?
							<span className='r-block__aside benton-regular'>Incumbent</span> : null

						return (
							<th scope='col' className='r-table__cell' key={i}>
								<p className={candidateClass}>{last}{incumbentSpan}</p>
								<p className='benton-regular'>{i === 0 ? 'Votes' : ''}</p>
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
