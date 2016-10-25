import React from 'react'

const MapLegend = () => (
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
				<dt className='legend__term'>Dem</dt>
				<dd className='legend__def hash-dem' />
				<dt className='legend__term'>GOP</dt>
				<dd className='legend__def hash-gop' />
				<dt className='legend__term'>Ind</dt>
				<dd className='legend__def hash-ind' />
			</dl>
		</li>
		<li className='legend__item'>
			<p className='legend__subhed'>Win</p>
			<dl className='legend__deflist'>
				<dt className='legend__term'>Dem</dt>
				<dd className='legend__def fill-dem' />
				<dt className='legend__term'>GOP</dt>
				<dd className='legend__def fill-gop' />
				<dt className='legend__term'>Ind</dt>
				<dd className='legend__def fill-ind' />
			</dl>
		</li>
	</ul>
)

export default MapLegend
