import React, { PropTypes } from 'react'
import _ from 'lodash'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import urlManager from './../utils/urlManager.js'
import nameUtil from './../utils/nameUtil.js'

const FeatureGroup = ({ race, isLite, domain }) => {

	const stateUnit =
		_.find(race.reportingUnits, { level: 'state' }) || {}

	const candidates = stateUnit.candidates || []

	return (
		<ResultGroup
			numWinners={race.numWinners}
			isFeature
			isLite={isLite}
			overline={nameUtil.race.name(race)}
			precinctsReportingPct={stateUnit.precinctsReportingPct}
			buttonText='See full results'
			buttonUrl={urlManager(domain).race(race)}
			candidates={sortByVoteCount(candidates)} />
	)

}

FeatureGroup.propTypes = {
	race: PropTypes.object.isRequired,
	isLite: PropTypes.bool,
	domain: PropTypes.string,
}

export default FeatureGroup
