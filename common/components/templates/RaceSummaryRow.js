/* RaceSummaryRow expects the following data:
 * id
 * name
 * barStyle
 * pctForDisplay
 * vote
 */
import React, { PropTypes } from 'react'

const RaceSummaryRow = (row) => (
		<tr key={row.id}>
			<th scope='row'>
				<div>
					<div>{row.name}</div>
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


RaceSummaryRow.propTypes = {
	row: PropTypes.object.isRequired,
}

export default RaceSummaryRow
