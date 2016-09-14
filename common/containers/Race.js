import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
// import RaceSummary from './../components/RaceSummary.js'
import Timer from './../components/Timer.js'
import MassMap from './../components/MassMap.js'
import DetailedResultsTable from './../components/DetailedResultsTable.js'

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

		// <RaceSummary data={summary} />

		const data = results.data['senate-ma-towns']
		const unitName = 'town'

		return (
			<div className='Race'>
				<h1>Race</h1>
				<Timer {...timerProps} />
				<MassMap {...{ selection, selectTown, data }} />
				<DetailedResultsTable {...{ data, unitName }} />
			</div>
		)

	}

}

export default Race
