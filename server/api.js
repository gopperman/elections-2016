// TODO: remove this file
import { readFileSync } from 'jsonfile'

export default (req, res) => {

	const filename = `./data/${req.params.results}.json`

	console.log(`waiting to read ${filename}`)

	setTimeout(() => {

		console.log(`reading ${filename}`)

		const file = readFileSync(filename)

		console.log(`sending ${filename}`)

		res.json(file)

	}, 2000)

}
