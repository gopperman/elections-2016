import _ from 'lodash'
import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import TestStatus from './../components/TestStatus.js'
import FeatureGroup from './../components/FeatureGroup.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
const url = '2016-11-08/prezcentral?races='

@connectToApi
class HpFeaturedRacesMixed extends Component {

	static getOmnitureTitle() {
		return ''
	}

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
		const { results, location } = props
		const { query } = location
		const { ids } = query

		// Get all races.
		const allRaces = _.get(results, 'data.races', [])

		// Get query params.
		const races = ids.split(',')
			.map(v => v.split('-'))
			.map(v => ({
				statePostal: v[0],
				raceID: v[1],
			}))
			.map(v => _.find(allRaces, {
				statePostal: v.statePostal,
				raceID: v.raceID,
			}))

		// Get test status.
		const isTest = _.some(races, 'test')

		// Get featured races.
		const featured = _.map(races, (race, key) =>
			(<FeatureGroup
				{...{
					race,
					key,
					isLite: true,
					domain: '//www.bostonglobe.com',
				}} />))

		return (
			<div className='election-graphic'>

				<TestStatus isTest={isTest} />

				{featured}

			</div>
		)

	}

}

export default HpFeaturedRacesMixed
