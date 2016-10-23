const urlManager = {

	base() {
		return '/elections/2016'
	},

	town(townName) {
		return `${this.base()}/town/${townName}`
	},

	office(officeName) {

		let result

		if (officeName.toLowerCase() === 'president') {
			result = `${this.base()}/president`
		} else {
			result = `${this.base()}/race/${officeName}`
		}

		return result

	},

	race(race) {

		const { officeName, seatName } = race
		let result

		if (officeName.toLowerCase() === 'president') {
			result = `${this.base()}/president`
		} else {
			result = `${this.base()}/race/${officeName}/${seatName}`
		}

		return result

	},

}

export default urlManager
