import React, { Component, PropTypes } from 'react'

// eslint-disable-next-line react/prefer-stateless-function
class RaceSummary extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {
		const summary = this.props.data
		console.log(summary)

		return (
			<div className='RaceSummary'>
				<h1>Race Title</h1>
				<ul>
					{ summary.candidates.map( c => {
						const barStyle = {
							width: '50%',
						}
						const barClasses = 'progressBar progressBar__' + c.party

						return (
							<li key={c.polID}>
								<p>{c.party}</p>
								<p>{c.first} {c.last}</p>
								<p>50% <span className={barClasses} style={barStyle}></span></p>
								<p>{c.voteCount} votes</p>
							</li>
						)}
					)}
				</ul>
			</div>
		)
	}
}
export default RaceSummary