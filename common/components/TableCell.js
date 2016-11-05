import React, { PropTypes } from 'react'

const TableCell = ({ name, pct, votes }) => (

	<td className='r-table__cell'>
		<p className='hide-accessible'>{name}</p>
		<p className='benton-bold'>{pct}%</p>
		<p className='benton-regular'>{votes}</p>
	</td>

)

TableCell.propTypes = {
	name: PropTypes.string.isRequired,
	pct: PropTypes.number.isRequired,
	votes: PropTypes.string.isRequired,
}

export default TableCell
