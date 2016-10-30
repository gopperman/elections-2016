import _ from 'lodash'
import compareStringsNoAlpha from './compareStringsNoAlpha.js'

const e = (s) => encodeURIComponent(encodeURIComponent(s))

const urlManager = {

	stringifyParams(params) {
		return _(_.map(params, (value, key) => ({ value, key })))
			.filter(v => v.value)
			.map(v => `${v.key}=${v.value}`)
			.value()
			.join('&')

	},

	base() {
		return '/elections/2016'
	},

	town(townName) {
		return `${this.base()}/MA/town/${e(townName)}`
	},

	office({ officeName, statePostal = '' }) {

		let result

		if (compareStringsNoAlpha(officeName, 'president')) {
			result = this.race({ officeName: 'president' })
		} else if (_.includes(['ma', 'nh'], statePostal.toLowerCase())) {
			result = `${this.base()}/${statePostal}/${e(officeName)}`
		} else {
			result = `${this.base()}/${e(officeName)}`
		}

		return result

	},

	race({ officeName, seatName, statePostal }) {

		let result

		// This function will only return urls for either president page,
		if (compareStringsNoAlpha(officeName, 'president')) {

			if (compareStringsNoAlpha(statePostal, 'ma')) {
				result = `${this.base()}/${statePostal}/${officeName}`
			} else {
				result = `${this.base()}/${officeName}`
			}

		// or a MA race.
		} else if (compareStringsNoAlpha(statePostal, 'ma') &&
		officeName && seatName) {

			result =
				`${this.base()}/${statePostal}/${e(officeName)}/${e(seatName)}`

		} else {

			result = null

		}

		return result

	},

}

export default urlManager
