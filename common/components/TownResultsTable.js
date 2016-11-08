// The `TownResultsTable` class displays detailed results for each
// town in the race.

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TownResultsTableRow from './TownResultsTableRow.js'

const createSummary = (raceName) =>
	// eslint-disable-next-line max-len
	`A table that has the candidate percent and vote count across the top and the towns down the left hand side for ${raceName}.`

class TownResultsTable extends Component {
	state = {
		isCollapsed: true,
	}

	expandTable = () => {
		this.setState({
			isCollapsed: false,
		})
	}

	render() {
		const { isCollapsed } = this.state
		const { towns, summaryCandidates, raceName } = this.props
		const tableContainer =
			classnames('table-container--outer', { 'collapsed': isCollapsed })

		return (
			<div className='r-block'>
				<h3 className='subhed benton-bold'><span>Town results</span></h3>
				<div className='{tableContainer}'>
					<div className='table-container--inner'>
						<table className='r-table' summary={createSummary(raceName)}>
							<thead className='r-table__head'>
								<tr className='r-table__row'>
									<th className='r-table__cell'>
										<p className='benton-bold'>Town</p>
										<p className='benton-regular'>Precincts reporting</p>
									</th>
									{ summaryCandidates.map((candidate, i) => {

										const { winner, last } = candidate

										const candidateClass =
											classnames('benton-bold', 'r-table__name',
												{ 'is-winner': !!winner })

										return (
											<th scope='col' className='r-table__cell' key={i}>
												<p className={candidateClass}>{last}</p>
												<p className='benton-regular'>{i === 0 ? 'Votes' : ''}</p>
											</th>
										)
									})
								}
								</tr>
							</thead>
							<tbody>
								{ towns.map((town, key) => (
									<TownResultsTableRow
										{...{ key, ...town, summaryCandidates }} />
								))}
							</tbody>
						</table>
					</div>
					<button onClick={this.expandTable}>Button Text</button>
				</div>
			</div>
		)
	}
}

TownResultsTable.propTypes = {
	towns: PropTypes.array.isRequired,
	summaryCandidates: PropTypes.array.isRequired,
	raceName: PropTypes.string.isRequired,
}

export default TownResultsTable
