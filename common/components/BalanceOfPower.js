// The `BalanceOfPower` class displays senate balance of power results.

/* eslint-disable no-return-assign */

import React, { Component, PropTypes } from 'react'
import { select } from 'd3-selection'
import deepEqual from 'deep-equal'
import { buildSeats } from './../utils/visUtils.js'

class BalanceOfPower extends Component {

	static propTypes = {
		dem: PropTypes.number.isRequired,
		gop: PropTypes.number.isRequired,
		ind: PropTypes.number.isRequired,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs.
	componentDidMount() {

		// Create outer width from container.
		const outerWidth = this._svg.parentNode.offsetWidth

		// Set outer height from outer width.
		const outerHeight = outerWidth

		// Create margins and inner dimensions.
		const margin = { top: 10, right: 10, bottom: 10, left: 10 }
		const width = outerWidth - margin.left - margin.right
		const height = outerHeight - margin.top - margin.bottom

		// Set viewBox on svg.
		select(this._svg)
			.attr('viewBox', `0 0 ${width} ${height}`)

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

		// Create outer width from container.
		const outerWidth = this._svg.parentNode.offsetWidth

		// Set outer height from outer width.
		const outerHeight = outerWidth

		// Set baseline radius of each row
		const baseRadius = 80

		// Get the data.
		const senate = buildSeats({ dem, gop, ind, total: 100, rows: 5 })

		// Select the svg node.
		const svg = select(this._svg)

		// Select all `g` and join them to a senate row.
		const row = svg.selectAll('g')
				.data(senate)

		// Append `g` and set its ENTER attributes (in this case only `transform`).
		const rowEnter = row.enter().append('g')
				.attr('transform', `translate(${outerWidth / 2}, ${outerHeight / 2})`)

		// Select all `circles` of `g` and join to the row's seats.
		const circle = rowEnter.selectAll('circle')
				.data((d, seatsRow) =>
					d.map(e => ({
						...e,
						row: seatsRow,
					}))
				)

		// The previous `data` function returns a UPDATE lifecycle.
		// Use it to set the UPDATE attributes.
		circle
				.attr('class', d => `fill-winner-${d.party}`)

		// Append `circle` and set its ENTER attributes.
		circle.enter().append('circle')
				.attr('r', 5)
				.attr('cx', (d, i) =>
					((baseRadius + ((d.row + 1) * 16)) * Math.cos((Math.PI / (senate[0].length - 1)) * i))
				)
				.attr('cy', (d, i) =>
					-((baseRadius + ((d.row + 1) * 16)) * Math.sin((Math.PI / (senate[0].length - 1)) * i))
				)
				.attr('class', d => `fill-winner-${d.party}`)
	}

	render() {

		return (
			<div className='balanceOfPower r-col r-feature'>
				<h3 className="overline benton-bold">Senate Balance of Power</h3>
				<svg ref={(c) => this._svg = c} />
				<a href="/elections/2016/race/U.S.%20Senate/" className="btn--primary benton-bold">See full results</a>
			</div>
		)

	}

}

export default BalanceOfPower
