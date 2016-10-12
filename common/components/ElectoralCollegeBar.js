import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import _ from 'lodash'
import classnames from 'classnames'

const ElectoralCollegeBar = ({
	candidates = [],
	precinctsReportingPct = '',
}) => {

	const dem = _.find(candidates, { party: 'Dem' }) || {}
	const gop = _.find(candidates, { party: 'GOP' }) || {}
	const demElectWon = +dem.electWon
	const demElectPct = ((demElectWon / 538) * 100).toFixed(2)
	const gopElectWon = +gop.electWon
	const gopElectPct = ((gopElectWon / 538) * 100).toFixed(2)
	const totalWon = _.sumBy(candidates, v => +v.electWon)
	const undecided = 538 - totalWon

	return (
		<div className='r-block'>
				<p className={classnames('r-block__special', { 'is-winner': dem.winner })}><span className='benton-bold'>{dem.electWon}</span> <span className='benton-regular'>{dem.last}</span></p>
				<p className={classnames('r-block__special', { 'is-winner': gop.winner })}><span className='benton-bold'>{gop.electWon}</span> <span className='benton-regular'>{gop.last}</span></p>
			<div className='r-block__duo-results r-block--electoral'>
				<div className='results-bar'>
					<span className='fill-dem' role='progressbar' aria-valuenow={`${demElectPct}%`} aria-valuemin='0' aria-valuemax='100' style={{width: `${demElectPct}%`}}></span>
					<span className='fill-gop' role='progressbar' aria-valuenow={`${gopElectPct}%`} aria-valuemin='0' aria-valuemax='100' style={{width: `${gopElectPct}%`}}></span>
				</div>
				<p className='r-block__meta benton-regular'>{addCommas(dem.voteCount || '')} votes</p>
				<p className='r-block__meta benton-regular'>{addCommas(gop.voteCount || '')} votes</p>
			</div>
			<p className='note benton-regular'><span>{precinctsReportingPct}% reporting</span></p>
		</div>
	)

}

ElectoralCollegeBar.propTypes = {
	candidates: PropTypes.array,
	precinctsReportingPct: PropTypes.string,
}

export default ElectoralCollegeBar
