/* eslint-disable no-return-assign */

import _ from 'lodash'
import React, { PropTypes } from 'react'
import { pie, arc } from 'd3-shape'
import ChartMetaItems from './ChartMetaItems.js'

const BalanceOfPowerArc = ({ dem, gop, ind, total, name }) => {

	const width = 100

	const demTotal = _.get(dem, 'holdovers', 0) + _.get(dem, 'won', 0)
	const indTotal = _.get(ind, 'holdovers', 0) + _.get(ind, 'won', 0)
	const gopTotal = _.get(gop, 'holdovers', 0) + _.get(gop, 'won', 0)
	const none = total - (demTotal + indTotal + gopTotal)

	// Prepare data.
	const data = [
		{ party: 'dem', seats: demTotal },
		{ party: 'ind', seats: indTotal },
		{ party: 'none', seats: none },
		{ party: 'gop', seats: gopTotal },
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
		{ name: 'Democrats', abbr: 'Dem', value: demTotal, color: 'dem' },
		{ name: 'Independents', abbr: 'Ind', value: indTotal, color: 'ind' },
		{ name: 'Undecideds', abbr: 'Undecideds', value: none, color: 'undecided' },
		{ name: 'Republicans', abbr: 'GOP', value: gopTotal, color: 'gop' },
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
	dem: PropTypes.object.isRequired,
	gop: PropTypes.object.isRequired,
	ind: PropTypes.object.isRequired,
	total: PropTypes.number.isRequired,
}

export default BalanceOfPowerArc
