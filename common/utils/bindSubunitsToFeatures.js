import _ from 'lodash'
import compare from './compareStrings.js'

export default ({ subunits, features }) =>

	features.map(f => ({
		...f,
		subunit: _.find(subunits, s =>
			compare(s.reportingunitName, f.properties.REPORTING_UNIT)),
	}))
