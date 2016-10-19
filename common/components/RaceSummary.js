// The `RaceSummary` class displays detailed the race's summary results.
import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { fullName, percent } from './../utils/Candidate.js'
import { sortByVoteCount, totalVotes } from './../utils/Candidates.js'
import { percentForDisplay } from './../utils/standardize.js'
import RaceSummaryRow from './../components/templates/RaceSummaryRow'

const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate, percent, and vote count across the top and the candidates down the left hand side for the ${raceName}.`

const RaceSummary = ({ unit, raceTitle }) => {
	console.log(unit)
	// Get statewide candidates.
	const summaryCandidates = sortByVoteCount(unit.candidates)

	// Get total votes, with commas.
	const votesCast = addCommas(totalVotes(unit.candidates))

	const rows = summaryCandidates.map((candidate, i, array) => {

		const { candidateID, voteCount } = candidate

		const candidateName = fullName(candidate)

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
			<RaceSummaryRow
				{...{
					key: candidateID,
					name: candidateName,
					barStyle,
					pctForDisplay,
					vote,
				}}
			/>
		)
	})

	// TODO: Add winner-tag class to candidates
	return (
		<section key={`${raceTitle} Summary`}>
			<h2 className='section-hed benton-bold'>{raceTitle}</h2>
			<table className='r-table' summary={createSummary(raceTitle)}>
				<thead className='r-table__head'>
					<tr className='r-table__row'>
						<th className='r-table__cell' scope='col'>
							<p className='Benton-Regular'>Candidate</p>
						</th>
						<th className='r-table__cell' scope='col'>
							<p className='Benton-Regular'>Percent</p>
						</th>
						<th className='r-table__cell' scope='col'>
							<p className='Benton-Regular'>Votes</p>
						</th>
					</tr>
				</thead>
				<tbody>
					{ rows }
				</tbody>
			</table>
			<p className='note benton-regular'>{unit.precinctsReportingPct}% reporting ({votesCast} votes total)</p>
		</section>
	)
}

RaceSummary.propTypes = {
	unit: PropTypes.object.isRequired,
	raceTitle: PropTypes.string.isRequired,
}

export default RaceSummary
