import React, { Component, PropTypes } from 'react'

// eslint-disable-next-line react/prefer-stateless-function
class ElectoralCollegeMap extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		// TODO: there can be a popular vote tie,
		// but can there be an electoral college tie?
		const { data } = this.props

		const { PresStateByStatetable } = data
		const states =
			(PresStateByStatetable && PresStateByStatetable.State) || []

				// <ul>
				// 	{ states.map(s => (
				// 		<li>State: {s.PostalCode}</li>
				// 		<li>Candidate
				// 	))}
				// </ul>

		return (
			<div className='ElectoralCollegeMap'>
				<h1>ElectoralCollegeMap</h1>
			</div>
		)

	}

}
export default ElectoralCollegeMap
