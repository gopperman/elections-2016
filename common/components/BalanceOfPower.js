// The `BalanceOfPower` class displays senate balance of power results.

/* eslint-disable no-return-assign */

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { select } from 'd3-selection'
import deepEqual from 'deep-equal'
import { buildSeatsWithHoldovers } from './../utils/visUtils.js'
import LinkButton from './LinkButton.js'
import urlManager from './../utils/urlManager.js'
import MapLegend from './MapLegend.js'

// Set width (this is an arbitrary number, but 100 is convenient).
const WIDTH = 100

// Set radius.
const RADIUS = WIDTH * 0.02

// Set number of rows.
const ROWS = 5

// Set distance from origin to first row.
const x1 = (WIDTH / 2) * 0.6

// Set distance between rows.
const x2 = ((WIDTH / 2) - x1) / (ROWS - 1)

// TODO: make sure it updates correctly
// TODO: add a LinkButton with a link to the right race
// TODO: add a result dual bar under balance of power
class BalanceOfPower extends Component {

	static propTypes = {
		dem: PropTypes.object.isRequired,
		gop: PropTypes.object.isRequired,
		ind: PropTypes.object.isRequired,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs.
	componentDidMount() {

		const height = WIDTH / 2

		// Set viewBox on svg.
		select(this._svg)
				.attr('viewBox',
					`0 0 ${WIDTH + (2 * RADIUS)} ${height + (2 * RADIUS)}`)
			.append('g')
				.attr('class', 'seats')
				.attr('transform',
					`translate(${(WIDTH / 2) + RADIUS}, ${height + RADIUS})`)

		// Draw chart (although at this point we might not have data).
		this.drawChart()
	}

	// This is invoked before rendering when new props or state are being
	// received. This method is not called for the initial render or when
	// `forceUpdate` is used.
	shouldComponentUpdate(nextProps) {

		return !(deepEqual(
			this.getDataFromProps(this.props),
			this.getDataFromProps(nextProps)
		))

	}

	// This is invoked immediately after the component's updates are flushed
	// to the DOM. This method is not called for the initial render.
	componentDidUpdate() {

		// After the component updates, draw chart.
		this.drawChart()

	}

	getDataFromProps(props) {
		const { dem, gop, ind } = props
		return { dem, gop, ind }
	}

	drawChart = () => {

		const { dem, gop, ind } = this.props

		// Build the matrix of seats.
		const seats =
			buildSeatsWithHoldovers({ dem, gop, ind, total: 100, rows: ROWS })

		// Get the number of columns.
		const columns = _(seats)
			.map('column')
			.max()

		// Select the svg node.
		const svg = select(this._svg).select('g.seats')

		// DATA JOIN
		const circles = svg.selectAll('circle')
			.data(seats, d => d.index)

		// ENTER + UPDATE
		circles.enter()
			.append('circle')
			.merge(circles)
				.attr('r', d => (d.isHoldover ? RADIUS / 3 : RADIUS))
				.attr('cx', d => x1 + (d.seat * x2))
				.attr('cy', 0)
				.attr('transform', d =>
					`scale(-1, 1) rotate(${d.column * (-180 / (columns))}, 0 0)`)
				.attr('class', d => `fill-winner-${d.party}`)

		// EXIT
		circles.exit().remove()
	}

	render() {

		const { dem, gop, ind } = this.props

		const demTotal = dem.won + dem.holdovers
		const indTotal = ind.won + ind.holdovers
		const gopTotal = gop.won + gop.holdovers

		const undecideds = 100 - (demTotal + indTotal + gopTotal)

		return (
			<div className='balanceOfPower r-col r-feature'>
				<h3 className='overline benton-bold'>U.S. Senate balance of power</h3>
				<svg ref={(c) => this._svg = c} />
				<MapLegend
					parties={['dem', 'gop', 'ind']}
					choices={['undecided', 'win']} />

				<p>Dem: {demTotal}</p>
				<p>Independents: {indTotal}</p>
				<p>GOP: {gopTotal}</p>
				<p>Undecideds: {undecideds}</p>

				<LinkButton
					text='See full results'
					url={urlManager.office({ officeName: 'U.S. Senate' })} />
			</div>
		)

	}

}

export default BalanceOfPower
