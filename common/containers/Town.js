/* eslint-disable max-len */

import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as actions from './../actions/actionCreators.js'
import Header from './../components/Header.js'
import ResultBar from './../components/ResultBar.js'
import Timer from './../components/Timer.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import { sortByVoteCount } from './../utils/Candidates.js'
import svgs from './../utils/svgs.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08?locat='

// and this one is the correct url - it returns everything.
const url = '2016-11-08?location='

const hooks = {
	fetch: ({ dispatch, params }) =>
		dispatch(actions.fetchResults({ url: `${url}${params.townName}` })),
}

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class Town extends Component {

	static propTypes = {
		params: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		timer: PropTypes.object.isRequired,
		results: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	componentDidMount = () => {
		this.fetchData()
	}

	componentDidUpdate = (prevProps) => {

		const { props } = this
		const { startTimer, cancelTimer } = props.actions
		const { results } = props

		// did we stop fetching?
		if (prevProps.results.isFetching && !props.results.isFetching) {

			// Get the data - or an empty object.
			const data = results.data || {}

			// Get API results.
			const races = data.races || []

			// For each race,
			const anyIncompleteRaces = _(races)
				// get its reportingUnits array,
				.map('reportingUnits')
				// flatten to a one-dimensional array,
				.flatten()
				// and see if there is at least one at less than 100% pct.
				.some(v => +v.precinctsReportingPct < 100)

			if (!anyIncompleteRaces) {
				cancelTimer()
			} else {
				startTimer()
			}

		}

	}

	fetchData = () => {
		const { dispatch, params } = this.props
		hooks.fetch({ dispatch, params })
	}

	render() {
		const { props, fetchData } = this
		const { timer, results, params } = props
		const { stopTimer } = props.actions

		const timerProps = {
			...timer,
			callback: () => {
				stopTimer()
				fetchData()
			},
		}

		// Get the data - or an empty object.
		const data = results.data || {}

		// Get API results.
		const races = data.races || []

		// Get test status.
		const isTest = _.some(data.races, 'test')

		const townTitle = params.townName

		const raceBlocks = races.map((race, i) => {

			const stateUnit = (race.reportingUnits || [])[0] || {}

			const candidates = stateUnit.candidates || []

			const candidateBlocks = sortByVoteCount(candidates)
				.map((candidate, key) =>
					<ResultBar {...{ key, candidate, candidates }} />)

			const { officeName, seatName } = race
			const raceTitle = [officeName, seatName].filter(v => v).join(', ')

			return (
				<div key={i}>
					<h2 className='benton-bold'>{raceTitle}</h2>
					{candidateBlocks}
				</div>
			)

		})

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<div className='hero lead-bg'>
						<h1 className='hed hero__hed benton-bold'>{townTitle}</h1>
						<div
							className='hero__flourish'
							dangerouslySetInnerHTML={{ __html: svgs.flourish }} />
					</div>

					<div className='container-lg'>

						<Timer {...timerProps} />

						{raceBlocks}

					</div>

				</main>

				<Footer />

			</div>
		)

	}

}

export default Town
