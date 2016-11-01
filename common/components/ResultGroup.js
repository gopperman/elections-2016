import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ResultBar from './ResultBar.js'
import LinkButton from './../components/LinkButton.js'

const ResultGroup = ({ candidates, precinctsReportingPct,
overline, buttonText, buttonUrl, isFeature, numWinners }) => {

	const button = buttonUrl && buttonText ?
		<LinkButton text={buttonText} url={buttonUrl} /> : null

	const mainClass = classnames('r-col', { 'r-feature': isFeature })

	const overlineH3 = () => {
		const klass = classnames('overline', 'benton-bold', {
			'has-aside': numWinners > 1,
		})
		return (overline ? <h3 className={klass}>{overline}</h3> : null)
	}

	const multipleWinnersDescription = numWinners > 1 ?
		// eslint-disable-next-line max-len
		<aside className='r-block__aside benton-regular'>This race allows a maximum of {numWinners} multiple winners</aside> : null

	return (
		<div className={mainClass}>
			{overlineH3()}
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
			{multipleWinnersDescription}
			{button}
		</div>
	)

}

ResultGroup.propTypes = {
	numWinners: PropTypes.number,
	isFeature: PropTypes.bool,
	precinctsReportingPct: PropTypes.string.isRequired,
	candidates: PropTypes.array.isRequired,
	overline: PropTypes.string,
	buttonUrl: PropTypes.string,
	buttonText: PropTypes.string,
}

export default ResultGroup
