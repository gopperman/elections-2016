import _ from 'lodash'
import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { fullName, percent } from './../utils/Candidate.js'
import { sort, totalVotes } from './../utils/Candidates.js'
import { getRaceUnits } from './../utils/dataUtil.js'
import { percentForDisplay } from './../utils/standardize.js'

/*		// Get the candidate's vote percent.
		const pct = percent({ candidates: array, candidateID })

		// Get the display-ready version of the percent.
		const pctForDisplay = percentForDisplay(pct)
		*/

// TODO: implement
const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the town down the left hand side for the ${raceName}.`

const RaceSummary = ({ race }) => {

	// Get this race's reporting units.
	const units = getRaceUnits(race)

	// Get the statewide unit.
	const state = _.find(units, { level: 'state' })

	// Get statewide candidates.
	const summaryCandidates = sort(state.candidates)

	// Get total votes
	const votesCast = totalVotes(state.candidates)

	const rows = summaryCandidates.map((candidate, i, array) => {
		const { candidateID, voteCount } = candidate

		// Add appropriate commas to the candidate's vote count.
		const vote = addCommas(voteCount)

		// Get the candidate's vote percent.
		const pct = percent({ candidates: array, candidateID })

		// Get the display-ready version of the percent.
		const pctForDisplay = percentForDisplay(pct)

		const barStyle = {
			width: `${pctForDisplay}%`
		}

		const barClass = `fill--${i}`

		return (
			<tr className='state-t--row'>
				<th scope='row' className='state-t--candidate'>
					<div className='state-t--meta'>
						<div className='state-t--name'>{fullName(candidate)}<span className='quit'></span></div>
						<div className='state-t--bar'>
							<span className={barClass} style={barStyle}></span>
						</div>
					</div>

				</th>

				<td className='state-t--pct'>{pctForDisplay}%</td>

				<td className='state-t--votes'>
					<span className='value'>{vote}</span>
					<span class='suffix'> votes</span></td>
			</tr>
		)
	})	

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
