import dateline from 'dateline'

const formatTime = (date) => {
	// Seconds since breaking news item was posted
	const seconds = Math.floor((new Date() - date) / 1000)
	const minutes = Math.floor(seconds / 60)

	const s = (minutes === 1) ? '' : 's'
	
	if (minutes < 60) {
		return `${minutes} minute${s} ago`
	}

	return dateline(date).getAPTime()
}

export {
	// eslint-disable-next-line import/prefer-default-export
	formatTime,
}
