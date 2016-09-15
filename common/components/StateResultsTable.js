// The `StateResultsTable` className displays detailed results for each
// state in the race.

import React, { PropTypes } from 'react'

const StateResultsTable = ({ race }) => {

	console.log(race)

	return (
		<pre>
			{ JSON.stringify(race, null, 2)}
		</pre>
	)
}

StateResultsTable.propTypes = {
	race: PropTypes.object.isRequired,
}

export default StateResultsTable
