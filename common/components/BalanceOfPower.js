// The `BalanceOfPower` class displays senate balance of power results.

/* eslint-disable no-return-assign */

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { select } from 'd3-selection'
import deepEqual from 'deep-equal'
import { buildSeats } from './../utils/visUtils.js'
import LinkButton from './LinkButton.js'
import urlManager from './../utils/urlManager.js'
import Legend from './Legend.js'

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
		displayLink: PropTypes.bool.isRequired,
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
			buildSeats({ dem, gop, ind, total: 100, rows: ROWS })

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
				.attr('r', d => (d.isHoldover ? RADIUS / 2 : RADIUS))
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
		const { displayLink } = this.props
		const demTotal = dem.won + dem.holdovers
		const gopTotal = gop.won + gop.holdovers
		const indTotal = ind.won + ind.holdovers
		const undecideds = 100 - (demTotal + gopTotal + indTotal)
		const link = (displayLink) ? (
			<LinkButton
				text='See full results'
				url={urlManager.office({ officeName: 'U.S. Senate' })} />
		) : null

		return (
			<div className='bop'>
				<h3 className='overline benton-bold'>US Senate balance of power</h3>
				<svg aria-hidden='true' ref={(c) => this._svg = c} />
				<ul className='chart-meta'>
					<li className='chart-meta__item'>
						<p className='chart-meta__info'>
							<abbr title='Democrats' className='benton-regular'>Dem</abbr>
							<span className='benton-bold color-dem'>{demTotal}</span>
						</p>
					</li>
					<li className='chart-meta__item'>
						<p className='chart-meta__info'>
							<abbr
								title='Republicans'
								className='benton-regular'>Gop</abbr>
							<span className='benton-bold color-gop'>{gopTotal}</span>
						</p>
					</li>
					<li className='chart-meta__item'>
						<p className='chart-meta__info'>
							<abbr
								title='Independents'
								className='benton-regular'>Ind</abbr>
							<span className='benton-bold color-ind'>{indTotal}</span>
						</p>
					</li>
					<li className='chart-meta__item'>
						<p className='chart-meta__info'>
							<abbr
								title='Undecideds'
								className='benton-regular'>Undecided</abbr>
							<span
								className='benton-bold color-undecided'>{undecideds}</span>
						</p>
					</li>
				</ul>
				<Legend
					parties={['dem', 'gop', 'ind']}
					choices={['undecided', 'win']} />
				<dl className='sublegend'>
					<dt className='sublegend__term benton-regular'>Holdovers</dt>
					<dd className='sublegend__def circle-sm' />
					<dt className='sublegend__term benton-regular'>Won</dt>
					<dd className='sublegend__def circle-lg' />
				</dl>
				{link}
			</div>
		)

	}

}

export default BalanceOfPower
