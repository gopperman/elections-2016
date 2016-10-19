import React, { PropTypes } from 'react'

const RaceSummaryRow = ({ name, barStyle, pctForDisplay, vote }) => (
	<tr className='r-table__row'>
		<td className='r-table__cell'>
			<p className='benton-bold'>{name}</p>
		</td>
		<td className='r-table__cell'>
			<p className='benton-bold'>{pctForDisplay}%</p>
		</td>
		<td className='r-table__cell'>
			<p className='benton-bold'>
				<span>{vote}</span>
			</p>
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
