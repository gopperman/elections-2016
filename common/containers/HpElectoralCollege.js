import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import TestStatus from './../components/TestStatus.js'

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
		return true
	}

	render() {

		const { props } = this
		const { timerProps, results } = props

		// Get the data - or an empty object.
		const data = results.data || {}

		// console.log(data)

// 		// Get all races.
// 		const races = data.races || []

// 		// Get all presidential races:
// 		const presRaces = _(races)
// 			// get all races where officeName='President',
// 			.filter({ officeName: 'President' })
// 			// get the first item of reportingUnits,
// 			.map(v => (v.reportingUnits || [])[0])
// 			// and don't include null items.
// 			.filter(v => v)
// 			.value()

// 		// Get presidential summary.
// 		const presSummary = _.find(presRaces, { statePostal: 'US' })

// 		// Get test status.
// 		const isTest = _.some(races, 'test')

		const isTest = true

						// <ElectoralCollegeBar {...presSummary} />

		return (
			<div className='election-is-open'>

				<TestStatus isTest={isTest} />

				<main id='content'>

					<div className='container-sm'>

						<Timer {...timerProps} />

					</div>

				</main>

			</div>
		)

	}

}

export default HpElectoralCollege

