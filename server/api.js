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

		case 'homepage': {
			console.log('about to send homepage data')

			setTimeout(() => res.json(readJson('homepage')), 0)
			break
		}

		default: {

			// Remove first bit
			const baseUrl = req.originalUrl.replace(/\/api\//, '')

			const url =
				`${process.env.API_URL}/electionapi/elections/${baseUrl}`

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
