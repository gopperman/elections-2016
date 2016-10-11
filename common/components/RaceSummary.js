import React, { PropTypes } from 'react'

				// <div className='results-bar'>
				// 	<span
				// 		className='fill-yes'
				// 		role='progressbar'
				// 		aria-valuenow='34.7'
				// 		aria-valuemin='0'
				// 		aria-valuemax='100'
				// 		style='width:34.7%' />
				// 	<span
				// 		className='fill-no'
				// 		role='progressbar'
				// 		aria-valuenow='24.2'
				// 		aria-valuemin='0'
				// 		aria-valuemax='100'
				// 		style='width:24.2%' />
				// </div>

				// <p className='r-block__meta'>
				// 	<span className='benton-bold'>34.7%</span>
				// 	<span className='benton-regular'>Yes</span>
				// </p>

				// <p className='r-block__meta'>
				// 	<span className='benton-bold'>24.2%</span>
				// 	<span className='benton-regular'>No</span>
				// </p>

const RaceSummary = ({ race }) => {

	console.log(race)

	const raceName = 'the race'
	const pctReporting = '78%'

	return (

		<div className='r-block'>
			<p className='r-block__name benton-bold'>{raceName}</p>
			<div className='r-block__duo-results'>

			</div>
			<p className='note benton-regular'><span>{pctReporting} reporting</span></p>
		</div>

	)

}

RaceSummary.propTypes = {
	race: PropTypes.object.isRequired,
}

export default RaceSummary
