// The `BalanceOfPower` class displays senate balance of power results.

/* eslint-disable no-return-assign */

import React, { Component, PropTypes } from 'react'
import { select } from 'd3-selection'
import deepEqual from 'deep-equal'
import { buildSeatColumns } from './../utils/visUtils.js'

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

// TODO: make sure it is getting data from AP
// TODO: make sure it updates correctly
// TODO: probably no need to make it square?
// TODO: style
// TODO: get colors right
// TODO: use a number to say who's won, pct reporting, etc
// TODO: add a LinkButton with a link to the right race
// TODO: add a result dual bar under balance of power
class BalanceOfPower extends Component {

	static propTypes = {
		dem: PropTypes.number.isRequired,
		gop: PropTypes.number.isRequired,
		ind: PropTypes.number.isRequired,
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
				.attr('class', 'columns')
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

		// Get the data.
		const senate =
			buildSeatColumns({ dem, gop, ind, total: 100, rows: ROWS }).reverse()

		// Select the svg node.
		const svg = select(this._svg).select('g.columns')

		// Select all `g` and join them to a senate row.
		const columns = svg.selectAll('g')
				.data(senate)

		// Append `g` and set its ENTER attributes - in this case,
		// a rotation about the origin.
		const columnEnter = columns.enter()
			.append('g')
				.attr('transform', (d, i, a) =>
					`rotate(${i * (-180 / (a.length - 1))}, 0 0)`)

		// Select all `circles` of `g` and join to the column's seats.
		const circle = columnEnter.selectAll('circle')
				.data((d, seatsColumn) =>
					d.map(e => ({
						...e,
						// TODO: is this necessary?
						column: seatsColumn,
					}))
				)

// 		// The previous `data` function returns a UPDATE lifecycle.
// 		// Use it to set the UPDATE attributes.
// 		circle
// 				.attr('class', d => `fill-winner-${d.party}`)

		// Append `circle` and set its ENTER attributes.
		circle.enter()
			.append('circle')
				.attr('r', RADIUS)
				.attr('cx', (d, i) => x1 + (i * x2))
				.attr('cy', 0)
				.attr('class', d => `fill-winner-${d.party}`)

	}

	render() {

		return (
			<div className='balanceOfPower r-col r-feature'>
				<h3 className='overline benton-bold'>US Senate balance of power</h3>
				<svg ref={(c) => this._svg = c} />
			</div>
		)

	}

}

export default BalanceOfPower
