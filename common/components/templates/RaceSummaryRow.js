/* RaceSummaryRow expects the following data:
 * candidateID
 * candidateName
 * barStyle
 * pctForDisplay
 * vote
 */
import React, { PropTypes } from 'react'

const RaceSummaryRow = ( row ) => {
	return (
		<tr key={row.candidateID}>
			<th scope='row'>
				<div>
					<div>{row.candidateName}</div>
					<div>
						<span style={row.barStyle} />
					</div>
				</div>
			</th>
			<td>{row.pctForDisplay}%</td>
			<td>
				<span>{row.vote}</span>
				<span> votes</span>
			</td>
		</tr>
	)
}

RaceSummaryRow.propTypes = {
	row: PropTypes.object.isRequired,
}

export default RaceSummaryRow
