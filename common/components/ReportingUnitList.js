import React, { Component, PropTypes } from 'react'
import { getTopCandidate } from './../utils/presidentialStateTable.js'

// eslint-disable-next-line react/prefer-stateless-function
class ReportingUnitList extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {
		const reportingUnits = this.props.data.reportingUnits
		console.log(reportingUnits)
		return (
			<div className='ReportingUnitList'>
				<h1>Town by Town Results</h1>
				<ul>
					{ reportingUnits.map( ru => {
						return (
							<li key={ru.reportingunitID}>
								<h2>{ru.reportingunitName}</h2>
								<p>Precincts Reporting: { ru.precinctsReporting } ({ ru.precinctsReportingPct}%)</p>
								<ul>
									{ ru.candidates.map( c => {
										return (
											<li key={c.polID}>
												<p>{c.first} {c.last} ({c.party})</p>
												<p>Votes: {c.voteCount} {c.winner}</p>
											</li>
										)
									})}
								</ul>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}

}
export default ReportingUnitList
