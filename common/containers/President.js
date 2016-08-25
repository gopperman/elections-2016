import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import ElectoralCollege from './../components/ElectoralCollege.js'
import Clock from './../components/Clock.js'

const hooks = {
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url: 'president' })),
}

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks(hooks)
@connect(s => s, mapDispatchToProps)
class President extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		timer: PropTypes.object.isRequired,
		results: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	}

	clickMe = () => {

		const { dispatch } = this.props

		hooks.fetch({ dispatch })

	}

	render() {

		const { startTimer, stopTimer, fetchResults } = this.props.actions
		const { startedAt } = this.props.timer
		const { results } = this.props
		const { isFetching } = results

		const clockProps = {
			startTimer,
			stopTimer,
			startedAt,
			isWaiting: isFetching,
			isDone: false,
			callback: fetchResults,
		}

		return (
			<div className='President'>
				<h1>President</h1>
				<button onClick={this.clickMe}>click</button>
				<Clock {...clockProps} />
				<ElectoralCollege data={results.data['president-us-states']} />
			</div>
		)

	}

}

export default President
