import React, { PropTypes } from 'react'
import { formatTime } from './../utils/timeUtil.js'
import svgs from './../utils/svgs.js'

const BreakingBar = (alert) => {
	const time = formatTime(new Date(alert.timestamp))

	return (Object.keys(alert).length) ? (
		<div className='breaking'  aria-live='polite'>
			<div className='breaking__content'>
				<p className='breaking__copy benton-bold'>
					<mark>Breaking:</mark> <a href={alert.link} target='_blank' >{alert.headline}</a>
					<time dateTime={alert.timestamp} className='benton-regular'>{time}</time>
				</p>
				<a 
					className='btn--tw' 
					href='"https://twitter.com/intent/tweet?text=Breaking%3A%20Giant%20meteor%20hurdles%20toward%20Earth&via=BostonGlobe&url=https://bostonglobe.com/elections/2016'
					target='_blank'
					dangerouslySetInnerHTML={{ __html: svgs.twitterSvg }} />
			</div>
			<button
				className='btn--close'
				onClick={function(){return null}}
				dangerouslySetInnerHTML={{ __html: svgs.closeSvg }} />
			</div>
	) : null
}

BreakingBar.propTypes = {
	item: PropTypes.object.isRequired,
}

export default BreakingBar
