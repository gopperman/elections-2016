import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import { getRaceUnits } from './../utils/dataUtil.js'
import Timer from './../components/Timer.js'
import ElectoralCollegeBar from './../components/ElectoralCollegeBar.js'
import { toSentenceCase } from './../utils/standardize.js'

const hooks = {
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url: 'town' })),
}

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class Town extends Component {

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

		const townName = toSentenceCase(props.params.townName)

		const races = results.data['town-abington'].map((race) => {
			const raceTitle = `${race.office_name} ${race.seat_name}`
			const unit = (race.reporting_units && race.reporting_units[0]) || []
			
			// TO-DO: We're waiting on consistent test data so we can use RaceSummary
			return (
				<li key={race.race_number}>
					{raceTitle}
					(Race Summary goes here)
				</li>
			)
		})

		return (
			<div className='Town'>
				<ElectoralCollegeBar data={results.data['president-us']} />
				<h1>{townName}, MA</h1>
				<ul>
					{races}
				</ul>
			</div>
		)

	}

}

export default Town
