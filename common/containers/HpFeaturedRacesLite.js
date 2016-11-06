import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import TestStatus from './../components/TestStatus.js'
import FeatureGroup from './../components/FeatureGroup.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?statePostal=MA&raceID='

@connectToApi
class HpFeaturedRaces extends Component {

	static getSection() {
		return ''
	}

	static getTitle() {
		return ''
	}

	static apiUrl({ query }) {
		return `${url}${query.ids}`
	}

	render() {

		const { props } = this
		const { timerProps, results } = props

		// Get all races.
		const races = _.get(results, 'data.races', [])

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get featured races.
		const featured = _.map(races, (race, key) =>
			<FeatureGroup {...{ race, key }} />)

		return (
			<div className='election-graphic'>

				<TestStatus isTest={isTest} />

				<Timer {...timerProps} />

				{featured}

			</div>
		)

	}

}

export default HpFeaturedRaces
