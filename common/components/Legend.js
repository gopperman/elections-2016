import React, { PropTypes } from 'react'
import { standardizeParty } from './../utils/standardize.js'
import LegendItem from './LegendItem.js'

const Legend = ({ parties, isPresidential,
choices = ['lead', 'win', 'none', 'tie'] }) => {

	const options = {

		lead(key) {
			return (
				<LegendItem
					key={key}
					terms={parties.map(party => ({
						label: standardizeParty(party),
						klass: `fill-leading-${party}`,
					}))}
					text='Lead' />
			)
		},

		win(key) {
			return (
				<LegendItem
					key={key}
					terms={parties.map(party => ({
						label: standardizeParty(party),
						klass: `fill-complete-${party}`,
					}))}
					text='Win' />
			)
		},

		none(key) {
			return (
				<LegendItem
					key={key}
					terms={[{ label: 'No results', klass: 'fill-none' }]}
					text='No results' />
			)
		},

		undecided(key) {
			return (
				<LegendItem
					key={key}
					terms={[{ label: 'Undecided', klass: 'fill-none' }]}
					text='Undecided' />
			)
		},

		tie(key) {
			return (
				<LegendItem
					key={key}
					terms={[{ label: 'Tie', klass: 'fill-tie' }]}
					text='Tie' />
			)
		},

		split(key) {
			return (
				<LegendItem
					key={key}
					terms={[{ label: 'Split votes', klass: 'fill-tie' }]}
					text='Split votes' />
			)
		},

	}

	const modifiedChoices = isPresidential ?
		['lead', 'win', 'none', 'split'] : choices

	const display = modifiedChoices.map((v, i) => options[v](i))

	return (
		<ul className='legend' aria-hidden='true'>
			{display}
		</ul>
	)

}

Legend.propTypes = {
	parties: PropTypes.array.isRequired,
	choices: PropTypes.array,
	isPresidential: PropTypes.bool,
}

export default Legend
