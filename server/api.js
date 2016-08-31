// TODO: remove this file
import { readFileSync } from 'jsonfile'

const readJson = (endpoint) =>
	readFileSync(`./data/${endpoint}.json`)

let counter = 0

export default (req, res) => {

	const { endpoint } = req.params

	console.log(`requesting ${endpoint}`)

	let result
	switch (endpoint) {

		case 'president': {

			console.log(`requesting president-ma-towns-${counter}`)

			result = {
				'president-us': readJson('president-us'),
				'president-us-states': readJson('president-us-states'),
				'president-ma-towns': readJson(`president-ma-towns-${counter}`),
			}

			console.log('about to send president data')

			++counter
			if (counter > 3) {
				counter = 0
			}

			setTimeout(() => res.json(result), 0)
			break
		}

		default:

			res.sendStatus(500)

	}

}
