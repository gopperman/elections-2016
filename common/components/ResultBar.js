import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { fullName, percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

// TODO: mark is winner
// TODO: use real votes
// TODO: use pct reporting
// TODO: mark incumbent
// TODO: mark checkmark
// TODO: add 'go to full results' button
// TODO: use images?
// TODO question: where can we find pct reporting in the API?
const ResultBar = ({ candidate, candidates, showImage }) => {

	const { party, candidateID, voteCount } = candidate

	const partyToDisplay = party.toLowerCase()
	const name = fullName(candidate)
	const pct = percentForDisplay(
		percent({ candidates, candidateID }))
	const style = { width: `${pct}%` }
	const vote = addCommas(voteCount)

	const image = showImage ?
		(<img
			className='r-block__img avatar'
			src='assets/avatar/trump.jpg'
			alt='Donald Trump' />) : null

	return (

		<div className='r-block'>

			{image}

			<p className='r-block__name benton-bold'>{name}</p>

			<div className='r-block__results'>
				<div className='r-block__bar results-bar'>

					<span
						className={`fill-${partyToDisplay}`}
						role='progressbar'
						aria-valuenow={pct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={style} />

				</div>
				<p className='r-block__meta benton-bold'>{+pct}%</p>
				<p className='r-block__meta benton-regular'>{vote} votes</p>
			</div>

			<p className='note benton-regular'><span>78% reporting</span></p>

		</div>

	)

}

ResultBar.propTypes = {
	candidate: PropTypes.object.isRequired,
	candidates: PropTypes.array.isRequired,
	showImage: PropTypes.bool,
}

export default ResultBar
