// The `Tooltip` class displays detailed results for the given reporting unit.

/* eslint-disable max-len */

import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import Candidates from './../utils/Candidates.js'
import { fullName, percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

// TODO: implement
const createSummary = ({ reportingunitName }) =>
	`A table that has the candidate, percent, and vote count for top candidates across the top and the candidates down the left hand side for ${reportingunitName} results.`

const Tooltip = ({ results, position }) => (
	<div>
		<pre>{ JSON.stringify(position, null, 2) }</pre>
		<table summary={createSummary(results)}>
			<caption>
				<div><span>{results.reportingunitName}</span></div>
				<div><span>{results.precinctsReportingPct}% reporting</span></div>
			</caption>
			<thead>
				<tr>
					<th scope='col'>Candidate</th>
					<th scope='col'>Percent</th>
					<th scope='col'>Votes</th>
				</tr>
			</thead>
			<tbody>
				{ Candidates.sort(results.candidates).map((candidate, i, candidates) => {

					const { candidateID, voteCount } = candidate

					// Create the candidate's full name, e.g. 'First Name'.
					const name = fullName(candidate)

					// Add appropriate commas to the candidate's vote count.
					const vote = addCommas(voteCount)

					// Get the candidate's vote percent.
					const pct = percent({ candidates, candidateID })

					// Get the display-ready version of the percent.
					const pctForDisplay = percentForDisplay(pct)

					// Create this candidate's table row.
					return (
						<tr>
							<th scope='row'><span>&nbsp;</span>{name}</th>
							<td>{pctForDisplay}<span>%</span></td>
							<td><span>{vote}</span></td>
						</tr>
					)
				})}
			</tbody>
		</table>
	</div>
)

Tooltip.propTypes = {
	results: PropTypes.object.isRequired,
	position: PropTypes.object.isRequired,
}

export default Tooltip
