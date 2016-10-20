const urlManager = {

	base() {
		return 'elections/2016'
	},

	race(race) {
		const { officeName, seatName } = race
		return `/${this.base()}/race/${officeName}/${seatName}`
	},

}

export default urlManager
