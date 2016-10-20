import React, { PropTypes } from 'react'
import ResultBar from './ResultBar.js'

const ResultGroup = ({ candidates, precinctsReportingPct }) => (

	<div>
		{ candidates.map((candidate, key, array) =>
			(<ResultBar
				{...{
					key,
					candidate,
					precinctsReportingPct: key === array.length - 1 ?
					precinctsReportingPct : null,
					candidates,
				}}
			/>))
		}
	</div>

)

ResultGroup.propTypes = {
	precinctsReportingPct: PropTypes.string.isRequired,
	candidates: PropTypes.array.isRequired,
}

export default ResultGroup
