import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import * as actions from './../actions/actionCreators.js'
import ElectoralCollege from './../components/ElectoralCollege.js'

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks({
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url: 'electoral-us' })),
})
@connect(s => s, mapDispatchToProps)
// eslint-disable-next-line react/prefer-stateless-function
export default class President extends Component {

	render() {

		return (
			<div className='President'>
				<h1>President</h1>
				<ElectoralCollege />
			</div>
		)

	}

}
