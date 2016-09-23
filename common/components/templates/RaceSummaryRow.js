/* RaceSummaryRow expects the following data:
 * id
 * name
 * barStyle
 * pctForDisplay
 * vote
 */
import React, { PropTypes } from 'react'

const RaceSummaryRow = ({ name, barStyle, pctForDisplay, vote }) => (
	<tr>
		<th scope='row'>
			<div>
				<div>{name}</div>
				<div>
					<span style={barStyle} />
				</div>
			</div>
		</th>
		<td>{pctForDisplay}%</td>
		<td>
			<span>{vote}</span>
			<span> votes</span>
		</td>
	</tr>
)


RaceSummaryRow.propTypes = {
	name: PropTypes.string.isRequired,
	barStyle: PropTypes.object.isRequired,
	pctForDisplay: PropTypes.string.isRequired,
	vote: PropTypes.string.isRequired,
}

export default RaceSummaryRow
