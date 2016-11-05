import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import { formatTime } from './../utils/timeUtil.js'
import svgs from './../utils/svgs.js'

class BreakingBar extends Component {
	state = {
		isVisible: true,
	}

	clearTooltip = () => {
		this.setState({
			isVisible: false,
		})
	}

	render() {

		const { isVisible } = this.state
		const { alert } = this.props

		const time = formatTime(new Date(alert.timestamp))

		const encodedURI = encodeURIComponent(alert.link)
		const encodedHeadline = encodeURIComponent(alert.headline)

		const breakingClass =
			classnames('breaking', { 'is-hidden': !isVisible })

		// eslint-disable-next-line max-len
		const twitterHref = `https://twitter.com/intent/tweet?text=${encodedHeadline}&via=BostonGlobe&url=${encodedURI}`

		return (Object.keys(alert).length) ? (
			<div className={breakingClass} aria-live='polite'>
				<div className='breaking__content'>
					<p className='breaking__copy benton-bold'>
						<mark>Breaking:</mark>
						<a
							href={alert.link}
							rel='noopener noreferrer'
							target='_blank'>{alert.headline} </a>
						<time
							dateTime={alert.timestamp}
							className='benton-regular'>{time}</time>
					</p>
					<a
						className='btn--tw'
						href={twitterHref}
						target='_blank'
						rel='noopener noreferrer'
						dangerouslySetInnerHTML={{ __html: svgs.twitterSvg }} />
				</div>
				<button
					className='btn--close'
					onClick={this.clearTooltip}
					dangerouslySetInnerHTML={{ __html: svgs.closeSvg }} />
			</div>
		) : null
	}
}

BreakingBar.propTypes = {
	alert: PropTypes.object.isRequired,
}

export default BreakingBar
