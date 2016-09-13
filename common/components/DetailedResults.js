// The `DetailedResults` className displays detailed results for each reporting unit
// in the race.

/* eslint-disable max-len */

import React from 'react'

// TODO: implement
const createSummary = (raceName) =>
	`A table that has the top 4 candidate percent and vote count across the top and the town or counties down the left hand side for the ${raceName}.`

const DetailedResults = () =>
	<div>
		<h1>DetailedResults</h1>
		<table summary={createSummary()}>
			<thead>
				<tr>
					<th scope='col'>
						<div>Town</div>
						<div>Precincts reporting</div>
					</th>
					<th scope='col'>
						<div>Trump</div>
						<div><div>Votes</div></div>
					</th>
					<th scope='col'>
						<div>Kasich</div>
						<div>empty</div>
					</th>
					<th scope='col'>
						<div>Others</div>
						<div>empty</div>
					</th>
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
	</div>

DetailedResults.propTypes = {
}

export default DetailedResults
