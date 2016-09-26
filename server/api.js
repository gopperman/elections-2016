// TODO: remove this file
import { readFileSync } from 'jsonfile'

let counter = 0

const readJson = (endpoint) =>
	readFileSync(`./data/${endpoint}.json`)

export default (req, res) => {

	const { endpoint } = req.params

	console.log(`requesting ${endpoint}`)

	let result
	switch (endpoint) {

		case 'president': {

			console.log('requesting president')

			result = {
				'president-us-states': readJson(`president-us-states-${counter}`),
				'president-ma-towns': readJson('president-ma-towns'),
			}

			console.log('about to send president data')

			++counter
			if (counter > 1) {
				counter = 0
			}

			setTimeout(() => res.json(result), 0)
			break
		}

		case 'race': {

			console.log('requesting race')

			result = {
				'president-us-states': readJson('president-us-states'),
				'senate-ma-towns': readJson('senate-ma-towns'),
			}

			console.log('about to send race data')

			setTimeout(() => res.json(result), 0)
			break
		}

		case 'town': {
			result = {
				'president-us-states': readJson('president-us-states'),
				'town-abington': readJson('town-abington'),
			}
			console.log('about to send town data')

			setTimeout(() => res.json(result), 0)
			break
		}

		default:

			res.sendStatus(500)

	}

}
