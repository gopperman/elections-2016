import React, { Component, PropTypes } from 'react'

// eslint-disable-next-line react/prefer-stateless-function
class MassMap extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		const { races } = this.props.data
		const race = (races && races[0]) || {}

		return (
			<div className='MassMap'>
				<pre>
					{ JSON.stringify(race, null, 2) }
				</pre>
			</div>
		)

	}

}
export default MassMap
