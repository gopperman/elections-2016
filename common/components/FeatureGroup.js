import React, { PropTypes } from 'react'
import _ from 'lodash'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import urlManager from './../utils/urlManager.js'
import nameUtil from './../utils/nameUtil.js'

const FeatureGroup = ({ race }) => {

	const stateUnit =
		_.find(race.reportingUnits, { level: 'state' }) || {}

	const candidates = stateUnit.candidates || []

	return (
		<ResultGroup
			isFeature
			overline={nameUtil.race.name(race)}
			precinctsReportingPct={stateUnit.precinctsReportingPct}
			buttonText='See full results'
			buttonUrl={urlManager.race(race)}
			candidates={sortByVoteCount(candidates)} />
	)

}

FeatureGroup.propTypes = {
	race: PropTypes.object.isRequired,
}

export default FeatureGroup
