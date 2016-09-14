// The `DetailedResults` className displays detailed results for each
// reporting unit in the race.

/* eslint-disable max-len */

import _ from 'lodash'
import React, { PropTypes } from 'react'
import { sort } from './../utils/Candidates.js'
import { getRaceSubunits } from './../utils/dataUtil.js'

// TODO: implement
const createSummary = (raceName) =>
	`A table that has the candidate percent and vote count across the top and the town or counties down the left hand side for the ${raceName}.`

const DetailedResults = ({ data }) => {

	const subunits = getRaceSubunits(data)

	const stateCandidates = sort(
		_.find(subunits, { level: 'state' }).candidates)

	return (
		<div>
			<h1>DetailedResults</h1>
			<table summary={createSummary()}>
				<thead>
					<tr>
						<th scope='col'>
							<div>Town</div>
							<div>Precincts reporting</div>
						</th>
						{ stateCandidates.map((c, i) => (
							<th scope='col' key={i}>
								<div>{c.last}</div>
								<div>{i === 0 ? 'Votes' : ''}</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div>Abington</div>
							<div>5 of 5</div>
						</td>
						<td>
							<div>57.9%</div>
							<div>1,222</div>
						</td>
						<td>
							<div>14.2%</div>
							<div>299</div>
						</td>
						<td>
							<div>27.9%</div>
							<div>588</div>
						</td>
					</tr>
				</tbody>
			</table>
			<pre>
				{ JSON.stringify(data, null, 2) }
			</pre>
		</div>
	)
}

DetailedResults.propTypes = {
	data: PropTypes.object.isRequired,
}

export default DetailedResults
