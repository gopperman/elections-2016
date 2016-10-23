const urlManager = {

	base() {
		return '/elections/2016'
	},

	office(officeName) {
		return `${this.base()}/race/${officeName}`
	},

	race(race) {
		const { officeName, seatName } = race
		return `${this.base()}/race/${officeName}/${seatName}`
	},

}

export default urlManager
