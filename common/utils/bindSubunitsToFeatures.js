import _ from 'lodash'
import compare from './compareStrings.js'

const findMatchingSubunit = ({ subunits, name,
property = 'reportingunitName' }) =>
	_.find(subunits, s => name && name.length &&
		compare(s[property], name))

export default ({ subunits, features, property = 'reportingunitName' }) =>
	features.map(f => ({
		...f,
		subunit: findMatchingSubunit({ subunits, name: f.id, property }),
	}))

export {
	findMatchingSubunit,
}
