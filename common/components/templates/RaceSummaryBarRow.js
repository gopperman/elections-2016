import React, { PropTypes } from 'react'

const RaceSummaryBarRow = ({ name, pctForDisplay, vote }) => (
	<div key={name} className='r-block'>
		<p className='r-block__name benton-bold is-winner'>{name}</p>
		<div className='r-block__results'>
			<div className='r-block__results-bar'>
				<span>Results</span>
			</div>
			<p className='r-block__meta benton-bold'>{pctForDisplay}%</p>
		</div>
		<p className="r-block__meta benton-regular">{vote} votes</p>
	</div>
)


RaceSummaryBarRow.propTypes = {
	name: PropTypes.string.isRequired,
	barStyle: PropTypes.object.isRequired,
	pctForDisplay: PropTypes.string.isRequired,
	vote: PropTypes.string.isRequired,
}

export default RaceSummaryBarRow
