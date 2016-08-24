// TODO: remove this file
import { readFileSync } from 'jsonfile'

const readJson = (endpoint) =>
	readFileSync(`./data/${endpoint}.json`)

export default (req, res) => {

	const { endpoint } = req.params

	console.log(`requesting ${endpoint}`)

	switch (endpoint) {

		case 'president':

			res.json({
				'president-ma-towns': readJson('president-ma-towns'),
				'president-us-states': readJson('president-us-states'),
			})
			break

		default:

			res.sendStatus(500)

	}

}
