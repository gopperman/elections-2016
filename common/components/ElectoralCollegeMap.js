import React, { Component, PropTypes } from 'react'
import { getTopCandidate } from './../utils/presidentialStateTable.js'

// eslint-disable-next-line react/prefer-stateless-function
class ElectoralCollegeMap extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		// TODO: there can be a popular vote tie,
		// but can there be an electoral college tie?
		// in other words, can a state be tied
		const { PresStateByStatetable } = this.props.data
		const states =
			(PresStateByStatetable && PresStateByStatetable.State) || []

		return (
			<div className='ElectoralCollegeMap'>
				<h1>ElectoralCollegeMap</h1>
				<ul>
					{ states.map(s => {

						const topCandidate = getTopCandidate(s)
						return (
							<li key={s.PostalCode}>
								<p>State: {s.PostalCode}</p>
								<p>Top candidate: {topCandidate.name}</p>
								<p>Party: {topCandidate.party}</p>
								<p>Winner: {topCandidate.Winner ? 'Yes' : 'No'}</p>
								<p>Electoral votes: {topCandidate.ElectWon}</p>
								<p>Popular votes percent: {topCandidate.PopPct}%</p>
								<p>Popular votes: {topCandidate.PopVote}</p>
							</li>
						)

					})}
				</ul>
			</div>
		)

	}

}
export default ElectoralCollegeMap
