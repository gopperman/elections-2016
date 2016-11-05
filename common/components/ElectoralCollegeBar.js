import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import _ from 'lodash'
import classnames from 'classnames'

const IMAGE_BASE = '//apps.bostonglobe.com/election-results/2016/general/assets/avatar/'

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
			<h3 className='overline benton-bold'>Electoral votes</h3>
			<div className='r-block__duo-results'>
				<img
					className='avatar r-block__img'
					aria-hidden='true' src={`${IMAGE_BASE}/clinton.jpg`}
					alt='Hillary Clinton' />
				<img
					className='avatar r-block__img'
					aria-hidden='true' src={`${IMAGE_BASE}/trump.jpg`}
					alt='Donald Trump' />
				<div className='feat-text'>
					<p className={classnames('feat-text__name', { 'is-winner': !!dem.winner })}>
						<span className='benton-bold color-dem feat-text__name--number'>{dem.electWon}</span>
						<span className='benton-bold'>{dem.last}</span>
					</p>
					<p className='feat-text__name--center'>
						<span className='benton-bold feat-text__name--number'>{undecided}</span>
						<span className='benton-regular'>Undecided</span>
					</p>
					<p className={classnames('feat-text__name', { 'is-winner': !!gop.winner })}>
						<span className='benton-bold color-gop feat-text__name--number'>{gop.electWon}</span>
						<span className='benton-bold'>{gop.last}</span>
					</p>
				</div>
				<div className='results-bar'>
					<span
						className='fill-complete-dem'
						role='progressbar'
						aria-valuenow={demElectPct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={{ width: `${demElectPct}%` }} />
					<span
						className='fill-complete-gop'
						role='progressbar'
						aria-valuenow={gopElectPct}
						aria-valuemin='0'
						aria-valuemax='100'
						style={{ width: `${gopElectPct}%` }} />
				</div>
				<div className='r-block__meta--feature'>
					<p className='benton-regular'>{addCommas(dem.voteCount || '')} votes</p>
					<p className='benton-regular'>270 to win</p>
					<p className='benton-regular'>{addCommas(gop.voteCount || '')} votes</p>
				</div>
			</div>
			<p className='note benton-regular'><span>{+precinctsReportingPct}% reporting</span></p>
		</div>
	)

}

ElectoralCollegeBar.propTypes = {
	candidates: PropTypes.array,
	precinctsReportingPct: PropTypes.string,
}

export default ElectoralCollegeBar
