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

		if (officeName.toLowerCase() === 'president') {
			result = `${this.base()}/president`
		} else {
			result = `${this.base()}/race/${e(officeName)}`
		}

		return result

	},

	race(race) {

		const { officeName, seatName } = race
		let result

		if (officeName.toLowerCase() === 'president') {
			result = `${this.base()}/president`
		} else {
			result = `${this.base()}/race/${e(officeName)}/${e(seatName)}`
		}

		return result

	},

}

export default urlManager
