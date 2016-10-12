import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { sortByVoteCount } from './../utils/Candidates.js'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'
import { getName } from './../utils/Race.js'

// TODO: at the moment this assumes that:
// - we are only dealing with either:
// 		a ballot question or other similar, officeID == I
//		a race where the only candidates we care about are blue or red
// - the summary reporting unit is level: 'state'
const FeaturedRace = ({ race }) => {

	const raceName = getName(race)

	const reportingUnits = race.reportingUnits || []

	// Get the race's summary reporting unit
	// TODO: verify that we are getting the right reporting unit
	// everywhere else.
	const summaryUnit = _.find(reportingUnits, { level: 'state' }) || {}

	const precincts = +(summaryUnit.precinctsReportingPct || 0)
	const candidates = sortByVoteCount(summaryUnit.candidates || [])

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
							{ 'is-winner': !!left.winner })}>{leftPct}%</span>
					<span className='benton-regular'>{left.last}</span>
				</p>

				<p className='r-block__meta'>
					<span
						className={classNames('benton-bold',
							{ 'is-winner': !!right.winner })}>{rightPct}%</span>
					<span className='benton-regular'>{right.last}</span>
				</p>

			</div>

			<p className='note benton-regular'>
				<span>{precincts}% reporting</span>
			</p>

		</div>

	)

}

FeaturedRace.propTypes = {
	race: PropTypes.object.isRequired,
}

export default FeaturedRace
