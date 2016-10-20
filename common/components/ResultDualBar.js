import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { sortByVoteCount } from './../utils/Candidates.js'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'
import { getName } from './../utils/Race.js'

// Assumptions:
// - displays vote count, not electoral votes
// - only deals with 'I' officeIDs (ballot question) or dem/gop races
const ResultDualBar = ({ race }) => {

	const raceName = getName(race)

	const reportingUnits = race.reportingUnits || []

	const stateUnit = _.find(reportingUnits, { level: 'state' }) || {}

	const precincts = +(stateUnit.precinctsReportingPct || 0)
	const candidates = sortByVoteCount(stateUnit.candidates || [])

	let left
	let right

	if (race.officeID === 'I') {

		left = _.find(candidates, { party: 'Yes' }) || {}
		right = _.find(candidates, { party: 'No' }) || {}

	} else {

		left = _.find(candidates, { party: 'Dem' }) || {}
		right = _.find(candidates, { party: 'GOP' }) || {}

	}

	const leftPct = percentForDisplay(
		percent({ candidates, candidateID: left.candidateID }))
	const rightPct = percentForDisplay(
		percent({ candidates, candidateID: right.candidateID }))

	const leftStyle = { width: `${leftPct}%` }
	const rightStyle = { width: `${rightPct}%` }

	return (

		<div className='r-block'>

			<p className='r-block__name benton-bold'>{raceName}</p>

			<div className='r-block__duo-results'>

				<div className='results-bar'>
					<span
						className='fill-dem'
						role='progressbar'
						aria-valuenow={leftPct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={leftStyle} />
					<span
						className='fill-gop'
						role='progressbar'
						aria-valuenow={rightPct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={rightStyle} />
				</div>

				<p className='r-block__meta'>
					<span
						className={classNames('benton-bold',
							{ 'is-winner': !!left.winner })}>{+leftPct}%</span>
					<span className='benton-regular'>{left.last}</span>
				</p>

				<p className='r-block__meta'>
					<span
						className={classNames('benton-bold',
							{ 'is-winner': !!right.winner })}>{+rightPct}%</span>
					<span className='benton-regular'>{right.last}</span>
				</p>

			</div>

			<p className='note benton-regular'>
				<span>{precincts}% reporting</span>
			</p>

		</div>

	)

}

ResultDualBar.propTypes = {
	race: PropTypes.object.isRequired,
}

export default ResultDualBar
