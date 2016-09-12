import React, { Component, PropTypes } from 'react'
import ReportingUnitResults from './../components/ReportingUnitResults.js'

// eslint-disable-next-line react/prefer-stateless-function
class ReportingUnitList extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {
		const reportingUnits = this.props.data.reportingUnits
		return (
			<div className='ReportingUnitList'>
				<h1>Town by Town Results</h1>
				<ul>
					{ reportingUnits.map( ru => (
							<ReportingUnitResults data={ru} />
						)
					)}
				</ul>
			</div>
		)
	}

}
export default ReportingUnitList
