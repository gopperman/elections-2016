// The `RaceSummaryTable` class displays a table of the race's summary results.
import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { fullName, percent } from './../../utils/Candidate.js'
import { sortByVoteCount, totalVotes } from './../../utils/Candidates.js'
import { percentForDisplay } from './../../utils/standardize.js'
import RaceSummaryBarRow from './RaceSummaryBarRow'

const RaceSummaryBar = ({ unit, raceTitle }) => {
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

		return (
			<RaceSummaryBarRow
				{...{
					name: candidateName,
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
			{ rows }
			<p className='note benton-regular'><span>{unit.precinctsReportingPct}% reporting ({votesCast} votes total)</span></p>
		</section>
	)
}

RaceSummaryBar.propTypes = {
	unit: PropTypes.object.isRequired,
	raceTitle: PropTypes.string.isRequired,
}

export default RaceSummaryBar
