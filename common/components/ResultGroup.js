import _ from 'lodash'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ResultBar from './ResultBar.js'
import LinkButton from './../components/LinkButton.js'

const ResultGroup = ({ candidates, precinctsReportingPct,
overline, buttonText, buttonUrl, isFeature }) => {

	const button = buttonUrl && buttonText ?
		<LinkButton text={buttonText} url={buttonUrl} /> : null

	const mainClass = classnames('r-col', { 'r-feature': isFeature })

	const numWinners = _.filter(candidates, v => !!v.winner).length

	const overlineH3 = () => {
		const aside = numWinners > 1 ? ' has-aside' : ''
		const classNames = `overline benton-bold${aside}`
		return (overline ? <h3 className={classNames}>{overline}</h3> : null)
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
	isFeature: PropTypes.bool,
	precinctsReportingPct: PropTypes.string.isRequired,
	candidates: PropTypes.array.isRequired,
	overline: PropTypes.string,
	buttonUrl: PropTypes.string,
	buttonText: PropTypes.string,
}

export default ResultGroup
