import React, { PropTypes } from 'react'
import _ from 'lodash'
import ResultGroup from './../components/ResultGroup.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import LinkButton from './../components/LinkButton.js'
import urlManager from './../utils/urlManager.js'
import { getName } from './../utils/Race.js'

const FeatureGroup = ({ race }) => {

	const stateUnit =
		_.find(race.reportingUnits, { level: 'state' }) || {}

	const candidates = stateUnit.candidates || []

	return (
		<div className='r-col r-feature'>
			<ResultGroup
				overline={getName(race)}
				precinctsReportingPct={stateUnit.precinctsReportingPct}
				candidates={sortByVoteCount(candidates)} />
			<LinkButton text='See full results' url={urlManager.race(race)} />
		</div>
	)

}

FeatureGroup.propTypes = {
	race: PropTypes.object.isRequired,
}

export default FeatureGroup
