import React, { PropTypes } from 'react'
import { formatTime } from './../utils/timeUtil.js'

const BreakingBar = (alert) => {
	const time = formatTime(new Date(alert.timestamp))

	return (
		<div className='r-block'>
			<p><span>Breaking:</span> <a href={alert.link}>{time} {alert.headline}</a></p>
			Tweet this update
			<span className='close'>X</span>
		</div>
	)
}

BreakingBar.propTypes = {
	item: PropTypes.object.isRequired,
}

export default BreakingBar
