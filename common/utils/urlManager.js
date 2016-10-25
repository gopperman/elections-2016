<<<<<<< HEAD
import compareStrings from './compareStrings.js'

=======
>>>>>>> 38513b2f7ecf2fc69bd492e9cc9a42d38457a933
const e = (s) => encodeURIComponent(encodeURIComponent(s))

const urlManager = {

	base() {
		return '/elections/2016'
	},

	town(townName) {
		return `${this.base()}/town/${e(townName)}`
	},

	office(officeName) {

		let result

		if (compareStrings(officeName, 'president')) {
			result = `${this.base()}/president`
		} else {
			result = `${this.base()}/race/${e(officeName)}`
		}

		return result

	},

	race(race) {

		const { officeName, seatName } = race
		let result

		if (compareStrings(officeName, 'president')) {
			result = `${this.base()}/president`
		} else {
			result = `${this.base()}/race/${e(officeName)}/${e(seatName)}`
		}

		return result

	},

}

export default urlManager
