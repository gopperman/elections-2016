import React, { PropTypes } from 'react'
import ResultBar from './ResultBar.js'

const ResultGroup = ({ candidates, precinctsReportingPct, overline }) => {

	const overlineH3 = overline ?
		<h3 className='overline benton-bold'>{overline}</h3> : null

	return (
		<div>
			{overlineH3}
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

}

ResultGroup.propTypes = {
	precinctsReportingPct: PropTypes.string.isRequired,
	candidates: PropTypes.array.isRequired,
	overline: PropTypes.string,
}

export default ResultGroup
