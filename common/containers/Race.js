// The `Race` class displays race results.

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import { getRaceUnits } from './../utils/dataUtil.js'
import Timer from './../components/Timer.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
import RaceSummary from './../components/RaceSummary.js'
import MassMap from './../components/MassMap.js'
import TownResultsTable from './../components/TownResultsTable.js'

const hooks = {
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url: 'race' })),
}

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class Race extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		timer: PropTypes.object.isRequired,
		results: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	// when component is initially mounted onto DOM, fire its 'fetch' hook
	componentDidMount = () => {
		this.fetchData()
	}

	componentDidUpdate = (prevProps) => {

		const { props } = this
		const { startTimer, cancelTimer } = props.actions

		// did we stop fetching?
		if (prevProps.results.isFetching && !props.results.isFetching) {

			// TODO: add data completeness check
			++this.count

			// is the race over?
			if (this.count > 0) {
				cancelTimer()
			} else {
				startTimer()
			}

		}

	}

	fetchData = () => {
		hooks.fetch({ dispatch: this.props.dispatch })
	}

	count = 0

	render() {

		const { props, fetchData } = this
		const { timer, results, selection } = props
		const { stopTimer, selectTown } = props.actions

		const timerProps = {
			...timer,
			callback: () => {
				stopTimer()
				fetchData()
			},
		}
		console.log(props)

		const race = results.data['senate-ma-towns']

		// Let's get the name of the office we're reporting on
		const raceTitle = (race.races && race.races[0].officeName) || ''

		// Get this race's reporting units.
		const units = getRaceUnits(race)

		// Get the statewide unit.
		const state = _.find(units, { level: 'state' })

		return (
			<div className='Race'>
				<ElectoralCollegeBar data={results.data['president-us']} />
				<h1>{state.stateName} {raceTitle}</h1>
				<RaceSummary unit={state} raceTitle />
				<MassMap {...{ selection, selectTown, race }} />
				<Timer {...timerProps} />
				<TownResultsTable {...{ race }} />
			</div>
		)

	}

}

export default Race
