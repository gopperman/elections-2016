import _ from 'lodash'
import React, { PropTypes } from 'react'
import { fullName, percent } from './../utils/Candidate.js'
import { sort, totalVotes } from './../utils/Candidates.js'
import { getRaceUnits } from './../utils/dataUtil.js'
//import RaceSummaryRow from './RaceSummaryRow.js'

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the towns down the left hand side for the ${raceName}.`

const RaceSummary = ({ race }) => {

	// Get this race's reporting units.
	const units = getRaceUnits(race)

	// Get the statewide unit.
	const state = _.find(units, { level: 'state' })

	// Get statewide candidates.
	const summaryCandidates = sort(state.candidates)

	// Get total votes
	const votesCast = totalVotes(state.candidates)

	// TODO: Add winner-tag class to candidates
	return (
		<div class="container">
			<div className='precincts-overall flex-item' aria-live={'polite'}>{state.precinctsReportingPct}% precincts reporting ({votesCast} votes total)</div>
			<table 
				class="state-t" summary={createSummary()}>
				<thead class="state-t--hed">
					<tr>
						<th scope="col" class="candidate">Candidate</th>
						<th scope="col" class="percent">Percent</th>
						<th scope="col" class="votes">Votes</th>
					</tr>
				</thead>
				<tbody>
					console.log(summaryCandidates)
					{ summaryCandidates.map((c, i) => (
							<tr className='state-t--row'>
								<th scope='row' className='state-t--candidate'>
									<div className='state-t--meta'>
										<div className='state-t--name'>{fullName(c)}<span className='quit'></span></div>
										<div className='state-t--bar'>
											<span className='fill--{i}'></span>
										</div>
									</div>

								</th>

								<td className='state-t--pct'>49.3%</td>

								<td className='state-t--votes'><span className='value'>{c.voteCount}</span> <span class='suffix'>votes</span></td>
							</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

RaceSummary.propTypes = {
	race: PropTypes.object.isRequired,
}

export default RaceSummary
