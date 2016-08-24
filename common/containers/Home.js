import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import * as actions from './../actions/actionCreators.js'

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks({
	fetch: ({ dispatch }) => dispatch(actions.fetchResults()),
})
@connect(s => s, mapDispatchToProps)
export default class Home extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		results: PropTypes.object.isRequired,
		timer: PropTypes.object.isRequired,
	}

	apiUrl = 'electoral-us'

	render() {

		return (
			<div className='Home'>
				{ JSON.stringify(this.props, null, 2) }
			</div>
		)

	}

}
