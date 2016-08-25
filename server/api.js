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
				'president-ma-towns': readJson('president-ma-towns'),
				'president-us-states': readJson('president-us-states'),
			}

			setTimeout(() => res.json(result), 3000)
			break
		}

		default:

			res.sendStatus(500)

	}

}
