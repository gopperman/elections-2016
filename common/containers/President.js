import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import ElectoralCollege from './../components/ElectoralCollege.js'

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
})

@provideHooks({
	fetch: ({ dispatch }) =>
		dispatch(actions.fetchResults({ url: 'president' })),
})
@connect(s => s, mapDispatchToProps)
// eslint-disable-next-line react/prefer-stateless-function
export default class President extends Component {

	static propTypes = {
		results: PropTypes.object.isRequired,
	}

	render() {

		const { results } = this.props

		return (
			<div className='President'>
				<h1>President</h1>
				<ElectoralCollege data={results.data['president-us-states']} />
			</div>
		)

	}

}
