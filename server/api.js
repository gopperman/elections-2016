// TODO: remove this file
import { readFileSync } from 'jsonfile'

export default (req, res) => {

	const file = readFileSync(`./data/${req.params.results}.json`)

	res.json(file)

}
