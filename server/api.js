// TODO: remove this file
import { readFileSync } from 'jsonfile'

const readJson = (endpoint) =>
	readFileSync(`./data/${endpoint}.json`)

export default (req, res) => {

	const { endpoint } = req.params

	console.log(`requesting ${endpoint}`)

	let result
	switch (endpoint) {

		case 'president': {

			result = {
				'president-us': readJson('president-us'),
				'president-us-states': readJson('president-us-states'),
				'president-ma-towns': readJson('president-ma-towns'),
			}

			console.log('about to send president data')

			setTimeout(() => res.json(result), 0)
			break
		}

		case 'race': {
			result = {
				'senate-ma-towns': readJson('senate-ma-towns'),
			}

			console.log('about to send race data')

			setTimeout(() => res.json(result), 0)
			break
		}

		default:

			res.sendStatus(500)

	}

}
