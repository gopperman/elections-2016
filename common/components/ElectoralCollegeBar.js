import React, { Component, PropTypes } from 'react'

// TODO: remove all unnecessary prefer-stateless-functions disables
// eslint-disable-next-line react/prefer-stateless-function
export default class ElectoralCollegeBar extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		const { data } = this.props

		// get summary results

		return (
			<div className='ElectoralCollegeBar'>
				ElectoralCollegeBar
				<pre>
					{ JSON.stringify(data, null, 2) }
				</pre>
			</div>
		)

	}

}
