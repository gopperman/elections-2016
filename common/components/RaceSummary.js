// The `RaceSummary` class displays detailed the race's summary results.

import _ from 'lodash'
import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { fullName, percent } from './../utils/Candidate.js'
import { sortByVoteCount, totalVotes } from './../utils/Candidates.js'
import { getRaceUnits } from './../utils/dataUtil.js'
import { percentForDisplay } from './../utils/standardize.js'
import RaceSummaryRow from './../components/templates/RaceSummaryRow'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate, percent, and vote count across the top and the candidates down the left hand side for the ${raceName}.`

const RaceSummary = ({ race }) => {

	// Get this race's reporting units.
	const units = getRaceUnits(race)

	// Get the statewide unit.
	const state = _.find(units, { level: 'state' })

	// Get statewide candidates.
	const summaryCandidates = sortByVoteCount(state.candidates)

	// Get total votes, with commas.
	const votesCast = addCommas(totalVotes(state.candidates))

	const rows = summaryCandidates.map((candidate, i, array) => {

		const { candidateID, voteCount } = candidate

		// Add appropriate commas to the candidate's vote count.
		const vote = addCommas(voteCount)

		// Get the candidate's vote percent.
		const pct = percent({ candidates: array, candidateID })

		// Get the display-ready version of the percent.
		const pctForDisplay = percentForDisplay(pct)

		const barStyle = {
			width: `${pctForDisplay}%`,
		}

		return (
			<tr key={i}>
				<th scope='row'>
					<div>
						<div>{fullName(candidate)}</div>
						<div>
							<span style={barStyle} />
						</div>
					</div>
				</th>
				<td>{pctForDisplay}%</td>
				<td>
					<span>{vote}</span>
					<span> votes</span>
				</td>
			</tr>
		)
	})

	// TODO: Add winner-tag class to candidates
	return (
		<div>
			<div>{state.precinctsReportingPct}% precincts reporting ({votesCast} votes total)</div>
			<table summary={createSummary()}>
				<thead>
					<tr>
						<th scope='col'>Candidate</th>
						<th scope='col'>Percent</th>
						<th scope='col'>Votes</th>
					</tr>
				</thead>
				<tbody>
					{ rows }
				</tbody>
			</table>
		</div>
	)
}

RaceSummary.propTypes = {
	race: PropTypes.object.isRequired,
}

export default RaceSummary
