/* eslint-disable no-return-assign */

// import LinkButton from './LinkButton.js'
// import urlManager from './../utils/urlManager.js'

import React, { PropTypes } from 'react'
import { pie, arc } from 'd3-shape'
import ChartMetaItems from './ChartMetaItems.js'

const BalanceOfPowerArc = ({ dem, gop, ind, total, name }) => {

	const width = 100

	// Calculate `none` seats.
	const none = total - (dem + ind + gop)

	// Prepare data.
	const data = [
		{ party: 'dem', seats: dem },
		{ party: 'ind', seats: ind },
		{ party: 'none', seats: none },
		{ party: 'gop', seats: gop },
	]

	const pieLayout = pie()
		.value(d => d.seats)
		.startAngle(-Math.PI / 2)
		.endAngle(Math.PI / 2)
		.sort(null)(data)

	const arcGenerator = arc()
		.outerRadius(width / 2)
		.innerRadius(width / 4)

	const metaItems = [
		{ name: 'Democrats', abbr: 'Dem', value: dem, color: 'dem' },
		{ name: 'Independents', abbr: 'Ind', value: ind, color: 'ind' },
		{ name: 'Undecideds', abbr: 'Undecideds', value: none, color: 'undecided' },
		{ name: 'Republicans', abbr: 'GOP', value: gop, color: 'gop' },
	]

	return (
		<div className='balance-of-power r-col'>
			<h3 className='overline benton-bold'>{name}</h3>
			<svg viewBox={`0 0 ${width} ${width / 2}`}>
				<g transform={`translate(${width / 2}, ${width / 2})`}>
					{pieLayout.map((d, i) => (
						<path
							key={i}
							className={`fill-winner-${d.data.party}`}
							d={arcGenerator(d)} />
					))}
				</g>
			</svg>
			<ChartMetaItems items={metaItems} />
		</div>
	)

}

BalanceOfPowerArc.propTypes = {
	name: PropTypes.string.isRequired,
	dem: PropTypes.number.isRequired,
	gop: PropTypes.number.isRequired,
	ind: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
}

export default BalanceOfPowerArc
