import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import Clock from './Clock.js'

class State extends Component {

	static propTypes = {
		actions: PropTypes.object,
		results: PropTypes.object,
		timer: PropTypes.object,
	}

	componentDidMount = () => this.fireFetchResults()

	fireFetchResults = () => {

		const { fetchResults } = this.props.actions
		fetchResults()

	}

	render() {

		const { startTimer, stopTimer, fetchResults } = this.props.actions
		const { startedAt } = this.props.timer
		const { isFetching } = this.props.results

		const clockProps = {
			startTimer,
			stopTimer,
			startedAt,
			fetchResults,
			isFetching,
		}

		return (
			<div className='State'>
				<Clock {...clockProps} />
			</div>
		)

	}

}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

export default connect(s => s, mapDispatchToProps)(State)
