import _ from 'lodash'
import React, { PropTypes } from 'react'
import LegendItem from './LegendItem.js'
import {
	normalizeParty,
	standardizeParty,
	orderParties,
} from './../utils/standardize.js'

const Legend = ({ races, parties, isPresidential,
choices = ['lead', 'win', 'none', 'tie'] }) => {

	const computedParties = parties ||
		orderParties(_(races)
			.map('candidates')
			.flatten()
			.map('party')
			.uniq()
			.map(normalizeParty)
			.uniq()
			.value())

	const options = {

		lead(key) {
			return (
				<LegendItem
					key={key}
					terms={computedParties.map(party => ({
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
					terms={computedParties.map(party => ({
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
	races: PropTypes.array,
	parties: PropTypes.array,
	choices: PropTypes.array,
	isPresidential: PropTypes.bool,
}

export default Legend
