import React, { Component, PropTypes } from 'react'

// TODO: remove all unnecessary prefer-stateless-functions disables
// eslint-disable-next-line react/prefer-stateless-function
export default class ElectoralCollegeBar extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		// TODO: assume nothing about existence of fields
		const { data } = this.props

		const { Sumtable } = data
		const candidates = Sumtable ? Sumtable.Cand : []

		// TODO: polyfill find
		const dem = candidates.find(x => x.party === 'Dem')
		const gop = candidates.find(x => x.party === 'GOP')
		// TODO: assume nothing, e.g. maybe there is no Others?
		const others = candidates.find(x => x.name === 'Others')

		const undecided = 538 - dem.ElectWon - gop.ElectWon - others.ElectWon

		return (
			<div className='ElectoralCollegeBar'>
				ElectoralCollegeBar

				<div>
					<h3>Dem</h3>
					<ul>
						<li>Name: {dem.name}</li>
						<li>Is winner: {dem.Winner}</li>
						<li>Electoral votes won: {dem.ElectWon}</li>
						<li>Popular votes: {dem.PopVote}</li>
					</ul>
				</div>

				<div>
					<h3>GOP</h3>
					<ul>
						<li>Name: {gop.name}</li>
						<li>Is winner: {gop.Winner}</li>
						<li>Electoral votes won: {gop.ElectWon}</li>
						<li>Popular votes: {gop.PopVote}</li>
					</ul>
				</div>

				<div>
					Precincts reported: {Sumtable.PrecinctsPct}%
				</div>

				<div>
					Undecided: {undecided}
				</div>

			</div>
		)

	}

}
