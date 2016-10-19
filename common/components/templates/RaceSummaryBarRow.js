import React, { PropTypes } from 'react'
import addCommas from 'add-commas'
import { fullName } from './../../utils/Candidate.js'

const RaceSummaryBarRow = ({ candidate, pctForDisplay }) => {
	console.log(candidate)
	const name = fullName(candidate)
	
	// Add appropriate commas to the candidate's vote count.
	const vote = addCommas(candidate.voteCount)

	const barStyle = {		
		width: `${pctForDisplay}%`,		
	}

	const winner = (candidate.winner && "X" === candidate.winner) ? 'is-winner' : ''

	//TO-DO: Determine ClassName

	return (
		<div key={name} className='r-block'>
			<p className={`r-block__name benton-bold ${winner}`}>{name}</p>
			<div className='r-block__results'>
				<div className='r-block__results-bar'>
					<span 
						className='fill-gop'
						style={barStyle}
						aria-valuenow={`${pctForDisplay}%`}
						aria-valuemin='0'
						aria-valuemax='100'
					>
					</span>
				</div>
				<p className='r-block__meta benton-bold'>{pctForDisplay}%</p>
			</div>
			<p className="r-block__meta benton-regular">{vote} votes</p>
		</div>
	)
}


RaceSummaryBarRow.propTypes = {
	candidate: PropTypes.object.isRequired,
	pctForDisplay: PropTypes.string.isRequired,
}

export default RaceSummaryBarRow
