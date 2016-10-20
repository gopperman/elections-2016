import React, { PropTypes } from 'react'

const LinkButton = ({ text, url }) => (
	<a href={url} className='btn--primary benton-bold'>{text}</a>
)

LinkButton.propTypes = {
	text: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
}

export default LinkButton
