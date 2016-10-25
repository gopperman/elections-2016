import React, { PropTypes } from 'react'
import classnames from 'classnames'
import svgs from './../utils/svgs.js'

const Hero = ({ title, isFeature }) => {

	const mainClass = classnames('hero', {
		'lead-bg': !isFeature,
		'lead-img': isFeature,
	})

	const h1Class =
		classnames('hed', 'hero__hed', { 'benton-bold': !isFeature })

	const h1 = isFeature ? (
		<h1 className={h1Class}>
			<span className='benton-regular'>Election </span>
			<span className='benton-bold'>2016</span>
		</h1>
	) : (<h1 className={h1Class}>{title}</h1>)

	return (
		<div className={mainClass}>
			{h1}
			<div
				className='hero__flourish'
				dangerouslySetInnerHTML={{ __html: svgs.flourish }} />
		</div>
	)
}

Hero.propTypes = {
	title: PropTypes.string.isRequired,
	isFeature: PropTypes.bool,
}

export default Hero
