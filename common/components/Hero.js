import React, { PropTypes } from 'react'
import classnames from 'classnames'
import svgs from './../utils/svgs.js'

const Hero = ({ title, isElectionCtrl, className }) => {

	const h1Class =
		classnames('hed', 'hero__hed', { 'benton-bold': !isElectionCtrl })

	const h1 = isElectionCtrl ? (
		<h1 className={h1Class}>
			<span className='benton-regular'>Election </span>
			<span className='benton-bold'>2016</span>
		</h1>
	) : (<h1 className={h1Class}>{title}</h1>)

	return (
		<div className={`hero lead ${className}`}>
			{h1}
			<div
				aria-hidden='true'
				className='hero__flourish'
				dangerouslySetInnerHTML={{ __html: svgs.flourish }} />
		</div>
	)
}

Hero.propTypes = {
	title: PropTypes.string.isRequired,
	className: PropTypes.string,
	isElectionCtrl: PropTypes.bool,
}

export default Hero
