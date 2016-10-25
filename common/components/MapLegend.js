import React, { PropTypes } from 'react'
import { standardizeParty } from './../utils/standardize.js'

const MapLegend = ({ parties }) => (
	<ul className='legend'>

		<li className='legend__item'>
			<p className='legend__subhed benton-regular'>Lead</p>
			<dl className='legend__deflist'>
				{parties.map(party => (
					[<dt className='legend__term benton-regular'>{standardizeParty(party)}</dt>,
						<dd className={`legend__def fill-leading-${party}`} />]
				))}
			</dl>
		</li>

		<li className='legend__item'>
			<p className='legend__subhed benton-regular'>Win</p>
			<dl className='legend__deflist'>
				{parties.map(party => (
					[<dt className='legend__term benton-regular'>{standardizeParty(party)}</dt>,
						<dd className={`legend__def fill-complete-${party}`} />]
				))}
			</dl>
		</li>

		<li className='legend__item'>
			<p className='legend__subhed benton-regular'>No Data</p>
			<dl className='legend__deflist'>
				<dt className='legend__term benton-regular hide-accessible'>No Data</dt>
				<dd className='legend__def fill-none' />
			</dl>
		</li>

		<li className='legend__item'>
			<p className='legend__subhed benton-regular'>Tie</p>
			<dl className='legend__deflist'>
				<dt className='legend__term benton-regular hide-accessible'>Tie</dt>
				<dd className='legend__def fill-tie' />
			</dl>
		</li>

	</ul>
)

MapLegend.propTypes = {
	parties: PropTypes.array.isRequired,
}

export default MapLegend
