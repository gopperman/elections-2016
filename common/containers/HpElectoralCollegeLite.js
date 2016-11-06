import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import TestStatus from './../components/TestStatus.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '016-11-08?officeID=P'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeID=P'

@connectToApi
class PresidentUS extends Component {

	static getSection() {
		return ''
	}

	static getTitle() {
		return ''
	}

	static apiUrl() {
		return url
	}

	render() {

		const { props } = this
		const { results } = props

		// Get races.
		const races = _.get(results, 'data.races', [])

		// Get US race.
		const allStates = _.map(races, 'reportingUnits[0]')

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get US presidential race summary.
		const summaryState = _.find(allStates, { statePostal: 'US' })

		// Finally we can render all the components!
		return (
			<div className='election-graphic'>
				<TestStatus isTest={isTest} />
				<ElectoralCollegeBar {...summaryState} />
			</div>
		)

	}

}

export default PresidentUS
