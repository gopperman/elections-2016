import _ from 'lodash'
import compareStringsNoAlpha from './compareStringsNoAlpha.js'

const urlManager = {

	tag(url, source, page) {
		return `${url}${source ? `?p1=BG_election_${source}_${page}` : ''}`
	},

	encode(s) {
		return s.replace(/&/g, '%2526')
	},

	decode(s) {
		return s.replace(/%2526/g, '&')
	},

	stringifyParams(params) {
		return _(_.map(params, (value, key) => ({ value, key })))
			.filter(v => v.value)
			.map(v => `${v.key}=${v.value}`)
			.value()
			.join('&')

	},

	base(source) {
		return this.tag('/elections/2016', source, 'central')
	},

	town({ townName, source }) {
		return this.tag(
			`${this.base()}/MA/town/${this.encode(townName)}`, source, 'town')
	},

	office({ officeName, statePostal = '', source }) {

		let result

		if (compareStringsNoAlpha(officeName, 'president')) {

			result = this.race({ officeName: 'President', source })

		} else if (_.includes(['ma', 'nh'], statePostal.toLowerCase())) {

			result = `${this.base()}/${statePostal}/${this.encode(officeName)}`
			result = this.tag(result, source, 'race')

		} else {

			result = `${this.base()}/${this.encode(officeName)}`
			result = this.tag(result, source, 'race')

		}

		return result

	},

	race({ officeName, seatName, statePostal, source }) {

		let result

		// This function will only return urls for either president page,
		if (compareStringsNoAlpha(officeName, 'president')) {

			if (compareStringsNoAlpha(statePostal, 'ma')) {
				result = `${this.base()}/${statePostal}/${officeName}`
			} else {
				result = `${this.base()}/${officeName}`
			}

			result = this.tag(result, source, 'president')

		// or a MA race.
		} else if (compareStringsNoAlpha(statePostal, 'ma') &&
		officeName && seatName) {

			result = [
				this.base(),
				statePostal,
				this.encode(officeName),
				this.encode(seatName),
			].join('/')

			result = this.tag(result, 'full', 'results')

		} else {

			result = null

		}

		return result

	},

}

export default urlManager
