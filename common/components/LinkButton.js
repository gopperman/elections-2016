import React, { PropTypes } from 'react'
import classnames from 'classnames'

const LinkButton = ({ text, url, isSecondary }) => (
	<a
		href={url}
		className={classnames('benton-bold', {
			'btn--primary': !isSecondary,
			'btn--secondary': isSecondary,
		})}>{text}</a>
)

LinkButton.propTypes = {
	text: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	isSecondary: PropTypes.bool,
}

export default LinkButton
