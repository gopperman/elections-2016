// TODO: remove this file
import { readFileSync } from 'jsonfile'

const { fetch } = require('fetch-ponyfill')()

const readJson = (endpoint) =>
	readFileSync(`./data/${endpoint}.json`)

export default (req, res) => {

	const { endpoint } = req.params

	let result
	switch (endpoint) {

		case 'election': {
			result = {
				'president-us-states': readJson('president-us-states-0'),
			}
			console.log('about to send election home data')

			setTimeout(() => res.json(result), 0)
			break
		}

		case 'race': {

			console.log('requesting race')

			result = {
				'president-us-states': readJson('president-us-states-0'),
				'senate-ma-towns': readJson('senate-ma-towns'),
			}

			console.log('about to send race data')

			setTimeout(() => res.json(result), 0)
			break
		}

		case 'town': {
			result = {
				'president-us-states': readJson('president-us-states-0'),
				'town-abington': readJson('town-abington'),
			}
			console.log('about to send town data')

			setTimeout(() => res.json(result), 0)
			break
		}

		default: {

			// Remove first bit
			const baseUrl = req.originalUrl.replace(/\/api\//, '')

			const url =
				`${process.env.API_URL}/${baseUrl}`

			console.log(`requesting ${url}`)

			fetch(url)
				.then(response => response.json())
				.then(json => res.json(json))
				.catch(e => {

					console.error(e)
					console.log('about to send 500')
					res.sendStatus(500)

				})

			break

		}

	}

}
