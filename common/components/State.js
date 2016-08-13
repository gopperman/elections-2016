import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from './../actions/actionCreators.js'

// eslint-disable-next-line react/prefer-stateless-function
class State extends Component {

	static propTypes = {
		actions: PropTypes.object,
		results: PropTypes.object,
	}

	componentDidMount = () => this.fireFetchResults()

	componentDidUpdate = (prevProps) => {

		const { results } = this.props
		const { isFetching } = results

		// did we just go from fetching to not fetching,
		// i.e., did our fetchResults complete?
		if (!isFetching && prevProps.results.isFetching) {

			// start the timer if results are incomplete
			// otherwise, don't start the timer

		}

	}

	fireFetchResults = () => {

		const { fetchResults } = this.props.actions
		fetchResults()

	}

	render() {

		return (
			<div className='State'>
				State
			</div>
		)

	}

}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

export default connect(s => s, mapDispatchToProps)(State)
