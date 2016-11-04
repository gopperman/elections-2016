import React, { PropTypes } from 'react'
import { formatTime } from './../utils/timeUtil.js'

const BreakingBar = (alert) => {
	const time = formatTime(new Date(alert.timestamp))

	return (
		<div className='breaking'  aria-live='polite'>
			<div className='breaking__content'>
				<p className='breaking__copy benton-bold'>
					<mark>Breaking:</mark> <a href={alert.link} target='_blank' >{alert.headline}</a>
					<time datetime={alert.timestamp} className='benton-regular'>{time}</time>
				</p>
			</div>
		</div>
	)
}

/* 
				<a 
					className='btn--tw' 
					href='"https://twitter.com/intent/tweet?text=Breaking%3A%20Giant%20meteor%20hurdles%20toward%20Earth&via=BostonGlobe&url=https://bostonglobe.com/elections/2016'
					target='_blank'
					dangerouslySetInnerHTML={{ __html: svgs.twitterSvg }} />

			<button
				className='btn--close'
				onClick={this.clearTooltip}
				dangerouslySetInnerHTML={{ __html: svgs.closeSvg }} />
*/

BreakingBar.propTypes = {
	item: PropTypes.object.isRequired,
}

export default BreakingBar
