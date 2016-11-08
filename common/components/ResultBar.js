import React, { PropTypes } from 'react'
import _ from 'lodash'
import addCommas from 'add-commas'
import classnames from 'classnames'
import nameUtil from './../utils/nameUtil.js'
import { fullName, percent } from './../utils/Candidate.js'
import {
	percentForDisplay,
	normalizeParty,
} from './../utils/standardize.js'

const ResultBar = ({ candidate, candidates, showImage, hideCheckmark,
precinctsReportingPct, isUnopposed, isLite }) => {

	const { party, candidateID, voteCount, winner, incumbent } = candidate

	const name = fullName(candidate)
	const pct = percentForDisplay(percent({ candidates, candidateID }))
	const style = { width: `${pct}%` }
	const vote = addCommas(voteCount)

	const image = showImage ?
		(<img
			className='r-block__img avatar'
			src={`assets/avatar/${name.toLowerCase()}.jpg`}
			alt={name} />) : null

	const candidateClass = classnames('r-block__name', 'benton-bold',
		{ 'is-winner': !!winner && !hideCheckmark })

	const tagClass = 'r-block__tag benton-regular'

	const runoffSpan = !isLite && winner === 'R' ?
		(<span className={tagClass}>
			<abbr title='advances'>Adv.</abbr> to runoff
		</span>) : null

	const incumbentSpan = !isLite && incumbent ?
		<span className={tagClass}>Incumbent</span> : null

	const partySpan = !isLite && !_.includes(['yes', 'no'], party.toLowerCase()) ?
		(<abbr
			title={nameUtil.party.name(party)}
			className={tagClass}>{party}</abbr>) : null

	const precincts = !isUnopposed && precinctsReportingPct ?
		(<p className='note benton-regular'>
			<span>{Math.round(+precinctsReportingPct)}% reporting</span>
		</p>) : null

	const votesEl = !isLite ?
		<p className='r-block__meta benton-regular'>{vote} votes</p> : null

	const barEl =
		(<div className='r-block__bar results-bar' aria-hidden='true'>
			<span
				className={`fill-complete-${normalizeParty(party)}`}
				role='progressbar'
				aria-valuenow={pct}
				aria-valuemin='0'
				aria-valuemax='100'
				style={style} />
		</div>)

	const results = !isUnopposed ?
		(<div className='r-block__results'>
			{barEl}
			<p className='r-block__meta benton-bold'>{+pct}%</p>
			{votesEl}
		</div>) : null

	return (

		<div className='r-block'>

			{image}

			<p className={candidateClass}>
				{name}{partySpan}{incumbentSpan}{runoffSpan}
			</p>

			{results}

			{precincts}

		</div>

	)

}

ResultBar.propTypes = {
	candidate: PropTypes.object.isRequired,
	candidates: PropTypes.array.isRequired,
	precinctsReportingPct: PropTypes.string,
	showImage: PropTypes.bool,
	hideCheckmark: PropTypes.bool,
	isUnopposed: PropTypes.bool,
	isLite: PropTypes.bool,
}

export default ResultBar
