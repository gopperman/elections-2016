import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import TestStatus from './../components/TestStatus.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeID=P&statePostal=US'

@connectToApi
class HpElectoralCollege extends Component {

	static getTitle() {
		return ''
	}

	static apiUrl() {
		return url
	}

	static areAllRacesComplete() {

		// TODO: implement
		return false
	}

	render() {

		const { props } = this
		const { timerProps, results } = props

		// Get the race.
		const race = _.get(results, 'data.races[0]', {})

		// Get test status.
		const isTest = !!race.test

		// Get the reporting unit.
		const summaryUnit = _.get(race, 'reportingUnits[0]', {})

		return (
			<div className='election-is-open'>

				<TestStatus isTest={isTest} />

				<main id='content'>

					<div className='container-sm'>

						<Timer {...timerProps} />

						<ElectoralCollegeBar {...summaryUnit} />

					</div>

				</main>

			</div>
		)

	}

}

export default HpElectoralCollege

