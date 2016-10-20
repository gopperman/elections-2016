const urlManager = {

	race(race) {
		const { officeName, seatName } = race
		return `/elections/2016/race/${officeName}/${seatName}`
	},

}

export default urlManager
