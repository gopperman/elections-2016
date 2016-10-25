import React, { PropTypes } from 'react'
import { standardizeParty } from './../utils/standardize.js'

const MapLegend = ({ parties }) => (
	<ul className='legend'>
		<li className='legend__item'>
			<p className='legend__subhed'>No Data</p>
			<dl className='legend__deflist'>
				<dt className='legend__term visually-hidden'>No Data</dt>
				<dd className='legend__def fill-none' />
			</dl>
		</li>
		<li className='legend__item'>
			<p className='legend__subhed'>Tie</p>
			<dl className='legend__deflist'>
				<dt className='legend__term visually-hidden'>Tie</dt>
				<dd className='legend__def fill-tie' />
			</dl>
		</li>
		<li className='legend__item'>
			<p className='legend__subhed'>Lead</p>
			<dl className='legend__deflist'>
				{parties.map(party => (
					[<dt className='legend__term'>{standardizeParty(party)}</dt>,
						<dd className={`legend__def hash-${party}`} />]
				))}
			</dl>
		</li>
		<li className='legend__item'>
			<p className='legend__subhed'>Win</p>
			<dl className='legend__deflist'>
				{parties.map(party => (
					[<dt className='legend__term'>{standardizeParty(party)}</dt>,
						<dd className={`legend__def fill-${party}`} />]
				))}
			</dl>
		</li>
	</ul>
)

MapLegend.propTypes = {
	parties: PropTypes.array.isRequired,
}

export default MapLegend
