import usAbbreviations from 'us-abbreviations'
import urlManager from './urlManager.js'
import compareStringsNoAlpha from './compareStringsNoAlpha.js'
import { clean, toTitleCase } from './standardize.js'

const convertStateToAP = usAbbreviations('postal', 'ap')

const election = {

	htmlTitle() {
		return ''
	},

}

const presidentUS = {

	htmlTitle() {
		return 'President'
	},

	name() {
		return 'US president results'
	},

}

const presidentMA = {

	htmlTitle() {
		return 'How Mass. voted for president'
	},

	name() {
		return this.htmlTitle()
	},

}

const office = {

	htmlTitle({ statePostal = '', officeName = '' }) {

		return clean([
			convertStateToAP(urlManager.decode(statePostal).toUpperCase()),
			toTitleCase(urlManager.decode(officeName)),
		]
		.filter(v => v)
		.join(' '))
	},

	name(params) {
		return this.htmlTitle(params)
	},

}

const race = {

	htmlTitle({ officeName, statePostal, seatName }) {

		let result

		if (compareStringsNoAlpha(officeName, 'president')) {
			if (compareStringsNoAlpha(statePostal, 'ma')) {
				result = presidentMA.htmlTitle()
			} else {
				result = presidentUS.htmlTitle()
			}
		} else {

			// e.g. MA State House
			const firstPart = [
				convertStateToAP(urlManager.decode(statePostal).toUpperCase()),
				toTitleCase(urlManager.decode(officeName)),
			]
			.filter(v => v)
			.join(' ')

			// e.g. 10th Bristol
			const secondPart = seatName ?
				toTitleCase(urlManager.decode(seatName)) : null

			// MA State House, 10th Bristol
			result = clean([firstPart, (secondPart || null)]
					.filter(v => v)
					.join(', '))

		}

		return result

	},

	name(params) {

		let result = ''

		if (compareStringsNoAlpha(params.officeName, 'president')) {
			if (compareStringsNoAlpha(params.statePostal, 'ma')) {
				result = presidentMA.name()
			} else {
				result = presidentUS.name()
			}
		} else {
			result = race.htmlTitle(params)
		}

		return result
	},

}

const town = {

	htmlTitle({ location, statePostal }) {

		return [
			toTitleCase(urlManager.decode(location)),
			convertStateToAP(urlManager.decode(statePostal).toUpperCase()),
		]
		.filter(v => v)
		.join(', ')

	},

	name(params) {
		return this.htmlTitle(params)
	},

}

const nameUtil = {
	election,
	presidentUS,
	presidentMA,
	office,
	race,
	town,
}

export default nameUtil
