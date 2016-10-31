// TODO: remove this file

const { fetch } = require('fetch-ponyfill')()

export default (req, res) => {

	const { originalUrl } = req

	// Remove first bit
	const baseUrl = originalUrl.replace(/\/api\//, '')

	const url =
		`${process.env.API_URL}/electionapi/elections/${baseUrl}`

	console.log(`fake api requesting ${url}`)

	fetch(url)
		.then(response => response.json())
		.then(json => res.json(json))
		.catch(e => {

			console.error(`api.js: could not fetch ${url}`)
			console.error(e)
			console.log('about to send 500')
			res.sendStatus(500)

		})

}
