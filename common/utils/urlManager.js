const urlManager = {

	base() {
		return '/elections/2016'
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
		return `${this.base()}/race/${officeName}/${seatName}`
	},

}

export default urlManager
