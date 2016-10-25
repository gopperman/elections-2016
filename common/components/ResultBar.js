import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import classnames from 'classnames'
import { fullName, percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'

const ResultBar = ({ candidate, candidates, showImage,
precinctsReportingPct }) => {

	const { party, candidateID, voteCount, winner, incumbent } = candidate

	const partyToDisplay = party.toLowerCase()
	const name = fullName(candidate)
	const pct = percentForDisplay(
		percent({ candidates, candidateID }))
	const style = { width: `${pct}%` }
	const vote = addCommas(voteCount)

	const image = showImage ?
		(<img
			className='r-block__img avatar'
			src={`assets/avatar/${name.toLowerCase()}.jpg`}
			alt='Donald Trump' />) : null

	const candidateClass = classnames('r-block__name', 'benton-bold',
		{ 'is-winner': !!winner })

	const precincts = precinctsReportingPct ?
		(<p className='note benton-regular'>
			<span>{+precinctsReportingPct}% reporting</span>
		</p>) :
		null

	const incumbentSpan = incumbent ?
		<span className='r-block__aside benton-regular'>Incumbent</span> : null

	return (

		<div className='r-block'>

			{image}

			<p className={candidateClass}>{name}{incumbentSpan}</p>

			<div className='r-block__results'>
				<div className='r-block__bar results-bar'>

					<span
						className={`fill-complete-${partyToDisplay}`}
						role='progressbar'
						aria-valuenow={pct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={style} />

				</div>
				<p className='r-block__meta benton-bold'>{+pct}%</p>
				<p className='r-block__meta benton-regular'>{vote} votes</p>
			</div>

			{precincts}

		</div>

	)

}

ResultBar.propTypes = {
	candidate: PropTypes.object.isRequired,
	candidates: PropTypes.array.isRequired,
	precinctsReportingPct: PropTypes.string,
	showImage: PropTypes.bool,
}

export default ResultBar
