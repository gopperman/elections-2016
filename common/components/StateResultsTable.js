// The `StateResultsTable` className displays detailed results for each
// state in the race.

import React, { PropTypes } from 'react'

const StateResultsTable = ({ data }) => {

	console.log(data)

	return (
		<div>
			{ JSON.stringify(data, null, 2)}
		</div>
	)
}

StateResultsTable.propTypes = {
	data: PropTypes.object.isRequired,
}

export default StateResultsTable
