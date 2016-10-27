import React, { PropTypes } from 'react'
import { standardizeParty } from './../utils/standardize.js'

const MapLegend = ({ parties,
choices = ['lead', 'win', 'none', 'undecided', 'tie'] }) => {

	const options = {

		lead(key) {
			return (
				<li key={key} className='legend__item'>
					<p className='legend__subhed benton-regular'>Lead</p>
					<dl className='legend__deflist'>
						{parties.map(party => (
							[<dt className='legend__term benton-regular'>{standardizeParty(party)}</dt>,
								<dd className={`legend__def fill-leading-${party}`} />]
						))}
					</dl>
				</li>
			)
		},

		win(key) {
			return (
				<li key={key} className='legend__item'>
					<p className='legend__subhed benton-regular'>Win</p>
					<dl className='legend__deflist'>
						{parties.map(party => (
							[<dt className='legend__term benton-regular'>{standardizeParty(party)}</dt>,
								<dd className={`legend__def fill-complete-${party}`} />]
						))}
					</dl>
				</li>
			)
		},

		none(key) {
			return (
				<li key={key} className='legend__item'>
					<p className='legend__subhed benton-regular'>No results</p>
					<dl className='legend__deflist'>
						<dt className='legend__term benton-regular hide-accessible'>No results</dt>
						<dd className='legend__def fill-none' />
					</dl>
				</li>
			)
		},

		undecided(key) {
			return (
				<li key={key} className='legend__item'>
					<p className='legend__subhed benton-regular'>Undecided</p>
					<dl className='legend__deflist'>
						<dt className='legend__term benton-regular hide-accessible'>No results</dt>
						<dd className='legend__def fill-none' />
					</dl>
				</li>
			)
		},

		tie(key) {
			return (
				<li key={key} className='legend__item'>
					<p className='legend__subhed benton-regular'>Tie</p>
					<dl className='legend__deflist'>
						<dt className='legend__term benton-regular hide-accessible'>Tie</dt>
						<dd className='legend__def fill-tie' />
					</dl>
				</li>
			)
		},

	}

	const display = choices.map((v, i) => options[v](i))

	return (
		<ul className='legend'>
			{display}
		</ul>
	)

}

MapLegend.propTypes = {
	parties: PropTypes.array.isRequired,
	choices: PropTypes.array,
}

export default MapLegend
