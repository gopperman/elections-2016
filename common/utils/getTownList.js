import _ from 'lodash'
import { toTitleCase } from './standardize.js'
import TOWNS from './../../data/output/townsList.json'

export default () => {

	const towns = _(TOWNS)
			.map(toTitleCase)
			.sortBy()
			.value()

	return towns

}
