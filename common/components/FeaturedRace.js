import _ from 'lodash'
import React, { PropTypes } from 'react'
import { sortByVoteCount } from './../utils/Candidates.js'
import { percent } from './../utils/Candidate.js'
import { percentForDisplay } from './../utils/standardize.js'
import { getName } from './../utils/Race.js'

// TODO: at the moment this assumes that:
// - we are only dealing with a dem/gop race
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

	const dem = _.find(candidates, { party: 'Dem' }) || {}
	const gop = _.find(candidates, { party: 'GOP' }) || {}

	const demPct = percentForDisplay(
		percent({ candidates, candidateID: dem.candidateID }))

	const gopPct = percentForDisplay(
		percent({ candidates, candidateID: gop.candidateID }))

	const demStyle = { width: `${demPct}%` }
	const gopStyle = { width: `${gopPct}%` }

	return (

		<div className='r-block'>

			<p className='r-block__name benton-bold'>{raceName}</p>

			<div className='r-block__duo-results'>

				<div className='results-bar'>
					<span
						className='fill-dem'
						role='progressbar'
						aria-valuenow={demPct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={demStyle} />
					<span
						className='fill-gop'
						role='progressbar'
						aria-valuenow={gopPct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={gopStyle} />
				</div>

				<p className='r-block__meta'>
					<span className='benton-bold'>{demPct}%</span>
					<span className='benton-regular'>{dem.last}</span>
				</p>

				<p className='r-block__meta'>
					<span className='benton-bold'>{gopPct}%</span>
					<span className='benton-regular'>{gop.last}</span>
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
