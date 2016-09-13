import _ from 'lodash'
import compare from './compareStrings.js'

const findMatchingSubunit = ({ subunits, name }) =>
	_.find(subunits, s => name.length && compare(s.reportingunitName, name))

export default ({ subunits, features }) =>
	features.map(f => ({
		...f,
		subunit:
			findMatchingSubunit({ subunits, name: f.properties.REPORTING_UNIT }),
	}))

export {
	findMatchingSubunit,
}
