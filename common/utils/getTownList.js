import * as topojson from 'topojson'
import _ from 'lodash'
import TOWNS from './../../data/output/TOWNS.json'
import { toTitleCase } from './standardize.js'

export default () => {

	const { features } = topojson.feature(TOWNS, TOWNS.objects.UNITS)

	const towns = _(features)
		.map(v => toTitleCase(v.id))
		.sortBy()
		.value()

	return towns

}
