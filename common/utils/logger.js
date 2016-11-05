import serializeError from 'serialize-error'

const logger = (e) => {

	console.error(JSON.stringify(serializeError(e), null, 2))

}

export default logger
