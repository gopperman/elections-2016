// TODO: remove this file
import { readFileSync } from 'jsonfile'

export default (req, res) => {

	console.log('waiting to read file.json')

	setTimeout(() => {

		console.log('reading file.json')
		const file = readFileSync(`./data/${req.params.results}.json`)

		console.log('sending file.json')
		res.json(file)

	}, 2000)

}
