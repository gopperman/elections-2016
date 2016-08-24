import React, { Component, PropTypes } from 'react'

// TODO: remove all unnecessary prefer-stateless-functions disables
// eslint-disable-next-line react/prefer-stateless-function
export default class ElectoralCollege extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		return (
			<div className='ElectoralCollege'>
				ElectoralCollege
				<pre>
					{ JSON.stringify(this.props.data, null, 2) }
				</pre>
			</div>
		)

	}

}
