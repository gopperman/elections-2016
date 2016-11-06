import React, { PropTypes } from 'react'
import classnames from 'classnames'
import nameUtil from './../utils/nameUtil.js'

const LegendItem = ({ terms, text }) => (

	<li className='legend__item'>
		<p className='legend__subhed benton-regular'>{text}</p>
		<dl className='legend__deflist'>

			{terms.map(term => {

				const { label, klass } = term

				const dtClass = classnames(
					'legend__term',
					'benton-regular',
					{ 'hide-accessible': terms.length < 2 }
				)

				const ddClass = classnames('legend__def', klass)

				return ([
					<dt className={dtClass}>
						<abbr title={nameUtil.party.name(label)}>{label}</abbr>
					</dt>,
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
