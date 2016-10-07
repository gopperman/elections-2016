// The `BalanceOfPower` class displays senate balance of power results.

/* eslint-disable no-return-assign */

import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'
import deepEqual from 'deep-equal'
import { buildSeats } from './../utils/visUtils.js'

class BalanceOfPower extends Component {

	static propTypes = {
		dem: PropTypes.number.isRequired,
		gop: PropTypes.number.isRequired,
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
		d3.select(this._svg)
			.attr('viewBox', `0 0 ${width} ${height}`)

		// Draw chart (although at this point we might not have data).
		this.drawChart()
	}

	// This is invoked before rendering when new props or state are being
	// received. This method is not called for the initial render or when
	// `forceUpdate` is used.
	shouldComponentUpdate(nextProps) {

		// // Update component if `dem` or `gop` has changed.
		// const { dem, gop } = this.props
		// const newDem = nextProps.dem
		// const newGop = nextProps.gop

		// If dem or gop numbers change, update
		return !(deepEqual(this.props.dem, nextProps.dem) && deepEqual(this.props.gop, nextProps.gop))

	}

	// This is invoked immediately after the component's updates are flushed
	// to the DOM. This method is not called for the initial render.
	componentDidUpdate() {

		// After the component updates, draw chart.
		this.drawChart()

	}

	drawChart = () => {
		// Create outer width from container.
		const outerWidth = this._svg.parentNode.offsetWidth

		// Set outer height from outer width.
		const outerHeight = outerWidth

		// Set baseline radius of each row
		const baseRadius = 80

		// Get the data.
		const senate = buildSeats(this.props.dem, this.props.gop, 100, 4)

		// Select the svg node.
		const svg = d3.select(this._svg)

		// Select all `g` and join them to a senate row.
		const row = svg.selectAll('g')
				.data(senate)

		// Append `g` and set its ENTER attributes (in this case only `transform`).
		const rowEnter = row.enter().append('g')
				.attr('transform', (d, i) => `translate(${outerWidth/2}, ${outerHeight/2})`)

		// Select all `circles` of `g` and join to the row's seats.
		const circle = rowEnter.selectAll('circle')
				.data((d, row) => 
					d.map(e => ({
						...e,
						row,
					}))
				)

		// The previous `data` function returns a UPDATE lifecycle.
		// Use it to set the UPDATE attributes.
		circle
				.attr('class', d => d.party)

		// Append `circle` and set its ENTER attributes.
		circle.enter().append('circle')
				.attr('r', 5)
				.attr('cx', (d, i) => 
					((baseRadius + (d.row + 1) * 16) * Math.cos(Math.PI/(senate[0].length - 1) * i))
				)
				.attr('cy', (d, i) =>
					-((baseRadius + (d.row + 1) * 16) * Math.sin(Math.PI/(senate[0].length - 1) * i))
				)
				.attr('class', d => d.party)
	}

	render() {

		return (
			<div className='balanceOfPower'>
				<h1>Balance of Power</h1>
				<svg ref={(c) => this._svg = c} />
			</div>
		)

	}

}

export default BalanceOfPower
