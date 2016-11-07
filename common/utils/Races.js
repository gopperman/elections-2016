import _ from 'lodash'

const sortRacesBySeatName = (o) => {
	const seatName = _.get(o, 'seatName')

	if (seatName) {
		const re = /^([0-9]+)(st|nd|th|rd)(.*)$/
		const dd = /^([0-9])([0-9]+)(st|nd|th|rd)(.*)$/ // Double Digits, i.e '10th'

		// To get this to sort correctly, we just pop a Z between the first and second digit
		return dd.test(seatName) ?
			seatName.replace(dd, '$4 z $1$2') : seatName.replace(re, '$3 $1')
	}
	// If we don't have a seatname, the regular sort order is fine
	return ''
}


export {
	// eslint-disable-next-line import/prefer-default-export
	sortRacesBySeatName,
}
