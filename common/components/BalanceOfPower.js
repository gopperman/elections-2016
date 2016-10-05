import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'
import { buildSeats } from './../utils/visUtils.js'

class BalanceOfPower extends Component {

	static propTypes = {
		dem: PropTypes.number.isRequired,
		gop: PropTypes.number.isRequired,
	}

	componentDidMount() {
		// Create margins.
		const container = document.getElementById('root')
		const margin = { top: 10, right: 10, bottom: 10, left: 10 }
		const outerWidth = container.offsetWidth
		const outerHeight = outerWidth
		const width = outerWidth - margin.left - margin.right
		const height = outerHeight - margin.top - margin.bottom
		const baseRadius = 80

		const senate = buildSeats(this.props.dem, this.props.gop, 100, 4)

		// Create svg.
		const svg = d3.select('.balanceOfPower').append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
			.append('g')
				.attr('transform', `translate(${outerWidth/2}, ${outerHeight/2})`)

		svg.selectAll('.seat')
				.data(senate)
			.enter().append('g')
				.each(function(d, i) {
						d3.select(this).selectAll('.seat')
						.data(d)
					.enter().append('circle')
						.attr('cx', (d, j) => 
							(baseRadius + (i+1) * 16) * Math.cos(Math.PI/(senate[0].length - 1) * j)
						)
						.attr('cy', (d, j) => 
							-((baseRadius + (i+1) * 16) * Math.sin(Math.PI/(senate[0].length - 1) * j))
						)
						.attr('r', 5)
						.attr("class", (d) => ('.balance__circle--' + d.party))
				})
	}

	render() {
		return (
			<div className='balanceOfPower'>
				<h1>Balance of Power</h1>
			</div>
		)

	}

}

export default BalanceOfPower