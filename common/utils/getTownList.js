import * as topojson from 'topojson'
import _ from 'lodash'
import { toTitleCase } from './standardize.js'
import getTownsShapefile from './getTownsShapefile.js'

const TOWNS = getTownsShapefile()

export default () => {

	const { features } = topojson.feature(TOWNS, TOWNS.objects.UNITS)

	const towns = _(features)
		.map(v => toTitleCase(v.id))
		.sortBy()
		.value()

	return towns

}
