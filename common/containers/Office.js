import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import { getPresidentSummaryState } from './../utils/dataUtil.js'
import RaceSummary from './../components/RaceSummary.js'
import Header from './../components/templates/Header.js'
import Footer from './../components/templates/Footer.js'
import Timer from './../components/Timer.js'

const url = '2016-11-08?officeName=U.S.%20House'

const hooks = {
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({url})),
}

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class Office extends Component {

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
		const { timer, results } = props
		const { stopTimer } = props.actions

		const officeName = props.params.officeName
		const races = props.results.data.races.map((race) => {
			const raceTitle = `${race.officeName}, ${race.seatName}`

			// Get this race's reporting units.
			//console.log(race)
			const unit = (race.reportingUnits && race.reportingUnits[0]) || []

			return (
				<li key={race.raceID}>
					{raceTitle}
					<RaceSummary unit={unit} raceTitle={raceTitle} />
				</li>
			)
		});

		//TODO: Get the president data for the header
		//<Header summaryState={getPresidentSummaryState(results.data['president-us-states'])} />
		return (
			<div className='Office'>
				<h1>{officeName}</h1>
				<ul>
					{races}
				</ul>
				<Footer />
			</div>
		)
	}
}

export default Office
