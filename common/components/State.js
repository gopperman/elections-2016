import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from './../actions/actionCreators.js'

class State extends Component {

	static propTypes = {
		actions: PropTypes.object,
	}

	render() {

		const { fetchResultsRequest } = this.props.actions		
		const onClick = () => {
			fetchResultsRequest()
		}

		return (
			<div className='State'>
				<button onClick={onClick}>fetch results</button>
			</div>
		)

	}

}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

export default connect(s => s, mapDispatchToProps)(State)
