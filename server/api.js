const { fetch } = require('fetch-ponyfill')()

export default (req, res) => {

	// Remove first bit
	const baseUrl = req.originalUrl.replace(/\/api\//, '')

	const url =
		`http://devweb.bostonglobe.com/electionapi/elections/${baseUrl}`

	console.log(`requesting ${url}`)

	fetch(url)
		.then(response => response.json())
		.then(json => res.json(json))
		.catch(e => console.error(e))

}
