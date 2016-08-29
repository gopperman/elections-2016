import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

// TODO: remove all unnecessary prefer-stateless-functions disables
// eslint-disable-next-line react/prefer-stateless-function
export default class ElectoralCollegeBar extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		const { data } = this.props

		const { Sumtable } = data
		const candidates = (Sumtable && Sumtable.Cand) || []

		// TODO: do we want to incorporate "leading"?
		const dem = _.find(candidates, { party: 'Dem' }) || {}
		const gop = _.find(candidates, { party: 'GOP' }) || {}
		const totalWon = _.sumBy(candidates, x => +x.ElectWon)
		const undecided = 538 - totalWon

		return (
			<div className='ElectoralCollegeBar'>
				<h1>ElectoralCollegeBar</h1>

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
