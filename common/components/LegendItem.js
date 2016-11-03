import React, { PropTypes } from 'react'
import classnames from 'classnames'

const LegendItem = ({ terms, text }) => (

	<li className='legend__item'>
		<p className='legend__subhed benton-regular'>{text}</p>
		<dl className='legend__deflist'>

			{terms.map(term => {

				const dtClass = classnames(
					'legend__term',
					'benton-regular',
					{ 'hide-accessible': terms.length < 2 }
				)

				const ddClass = classnames('legend__def', term.klass)

				return ([
					<dt className={dtClass}>{term.label}</dt>,
					<dd className={ddClass} />,
				])

			})}

		</dl>
	</li>

)

LegendItem.propTypes = {
	terms: PropTypes.array.isRequired,
	text: PropTypes.string.isRequired,
}

export default LegendItem
