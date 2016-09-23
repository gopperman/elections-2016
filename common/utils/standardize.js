const toSentenceCase = (s) =>
	[s[0].toUpperCase(), s.slice(1)].join('')

const percentForDisplay = (x, shorten) => {

	const decimalPlaces = shorten ? 0 : 1
	let result

	if (x === 1) {
		result = '100'
	} else if (x === 0) {
		result = '0'
	} else {
		result = (100 * x).toFixed(decimalPlaces).toString()
	}

	return result

}

export {
	// eslint-disable-next-line import/prefer-default-export
	percentForDisplay,
	toSentenceCase,
}
