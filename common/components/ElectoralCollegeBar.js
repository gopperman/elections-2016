import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import _ from 'lodash'

const ElectoralCollegeBar = ({
	candidates = [],
	precinctsReportingPct = '',
}) => {

	const dem = _.find(candidates, { party: 'Dem' }) || {}
	const gop = _.find(candidates, { party: 'GOP' }) || {}
	const totalWon = _.sumBy(candidates, v => +v.electWon)
	const undecided = 538 - totalWon

	return (
		<div className='ElectoralCollegeBar'>
			<h1>ElectoralCollegeBar</h1>

			<div>
				<h3>Dem</h3>
				<ul>
					<li>Name: {dem.last}</li>
					<li>Is winner: {dem.winner}</li>
					<li>Electoral votes won: {dem.electWon}</li>
					<li>Popular votes: {addCommas(dem.voteCount || '')}</li>
				</ul>
			</div>

			<div>
				<h3>GOP</h3>
				<ul>
					<li>Name: {gop.last}</li>
					<li>Is winner: {gop.winner}</li>
					<li>Electoral votes won: {gop.electWon}</li>
					<li>Popular votes: {addCommas(gop.voteCount || '')}</li>
				</ul>
			</div>

			<div>
				Precincts reported: {precinctsReportingPct}%
			</div>

			<div>
				Undecided: {undecided}
			</div>

		</div>
	)

}

ElectoralCollegeBar.propTypes = {
	candidates: PropTypes.array,
	precinctsReportingPct: PropTypes.string,
}

export default ElectoralCollegeBar
