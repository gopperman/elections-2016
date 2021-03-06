import _ from 'lodash'
import usAbbreviations from 'us-abbreviations'

const convertStateToFull = usAbbreviations('postal', 'full')

const sortRacesBySeatName = (o) => {
	const seatName = _.get(o, 'seatName')
	const national = _.get(o, 'national')
	const state = convertStateToFull(_.get(o, 'statePostal'))

	if (seatName) {
		const re = (national) ? /^(.*)([0-9+])$/ : /^([0-9]+)(st|nd|th|rd)(.*)$/

		// Double Digits, i.e '10th'
		const dd = (national) ? /^(.*)([0-9])([0-9+])$/ : /^([0-9])([0-9]+)(st|nd|th|rd)(.*)$/

		if (national) {
			const massFlag = (state === 'Massachusetts') ? 'AA' : '' // Make Massachusetts first again!

			// To get this to sort correctly, we just pop a Z before double digit numbers
			return `${massFlag}${state} ${(dd.test(seatName)) ?
				seatName.replace(dd, '$1z$2$3') : seatName.replace(re, '$1$2')}`
		}
		// State races
		return (dd.test(seatName)) ?
			seatName.replace(dd, '$4 z $1$2') : seatName.replace(re, '$3 $1')
	}
	// If we don't have a seatname, sort by state (US Senate)
	return state
}


export {
	// eslint-disable-next-line import/prefer-default-export
	sortRacesBySeatName,
}
