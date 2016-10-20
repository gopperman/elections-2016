import React, { PropTypes } from 'react'
import svgs from './../utils/svgs.js'

const Hero = ({ title }) => (
	<div className='hero lead-bg'>
		<h1 className='hed hero__hed benton-bold'>{title}</h1>
		<div
			className='hero__flourish'
			dangerouslySetInnerHTML={{ __html: svgs.flourish }} />
	</div>
)

Hero.propTypes = {
	title: PropTypes.string.isRequired,
}

export default Hero
