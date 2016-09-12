import React, { Component, PropTypes } from 'react'

class ReportingUnitResults extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {
		const ru = this.props.data
		return (
			<li className='reportingUnitResults' key={ru.reportingunitID}>
				<h2>{ru.reportingunitName}</h2>
				<p>Precincts Reporting: { ru.precinctsReporting } ({ ru.precinctsReportingPct}%)</p>
				<ul>
					{ ru.candidates.map( c => (
							<li key={c.polID}>
								<p>{c.first} {c.last} ({c.party})</p>
								<p>Votes: {c.voteCount} {c.winner}</p>
							</li>
						)
					)}
				</ul>
			</li>
		)
	}
}
export default ReportingUnitResults