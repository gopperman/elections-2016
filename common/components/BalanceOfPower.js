// The `BalanceOfPower` class displays senate balance of power results.

/* eslint-disable no-return-assign */

import React, { Component, PropTypes } from 'react'
import { select } from 'd3-selection'
import { scalePoint } from 'd3-scale'
import { range } from 'd3-array'
import deepEqual from 'deep-equal'
import { buildSeats } from './../utils/visUtils.js'

import LinkButton from './LinkButton.js'
import urlManager from './../utils/urlManager.js'
import Legend from './Legend.js'

const WIDTH = 100
const HEIGHT = WIDTH / 4
const RADIUS = WIDTH * 0.019

// TODO: make sure it updates correctly
class BalanceOfPower extends Component {

	static propTypes = {
		dem: PropTypes.object.isRequired,
		gop: PropTypes.object.isRequired,
		ind: PropTypes.object.isRequired,
		rows: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		displayLink: PropTypes.bool.isRequired,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs.
	componentDidMount() {

		const { rows, total } = this.props
		this._columns = Math.ceil(total / rows)
		console.log(this._columns)

		const margin =
			{ top: RADIUS, right: RADIUS, bottom: RADIUS, left: RADIUS }

		const width = WIDTH - margin.left - margin.right
		const height = HEIGHT - margin.top - margin.bottom

		this._x = scalePoint().range([0, width]).domain(range(this._columns))
		this._y = scalePoint().range([height, 0]).domain(range(rows))

		// Set svg.
		select(this._svg)
				.attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
			.append('g')
				.attr('class', 'seats')
				.attr('transform', `translate(${margin.left}, ${margin.top})`)

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

		const { dem, gop, ind, total, rows } = this.props

		// Build the matrix of seats.
		const seats = buildSeats({ dem, gop, ind, total, rows })

		// Select the svg node.
		const svg = select(this._svg).select('g.seats')

		// DATA JOIN
		const circles = svg.selectAll('circle')
			.data(seats)

		// ENTER + UPDATE
		circles.enter()
			.append('circle')
			.merge(circles)
				.attr('r', d => {
					let radius
					if (d.party) {
						if (d.isHoldover) {
							radius = RADIUS / 2
						} else {
							radius = RADIUS
						}
					} else {
						radius = 0
					}
					return radius
				})
				.attr('cx', (d, i) => this._x(i % this._columns))
				.attr('cy', (d, i) => this._y(Math.floor(i / this._columns)))
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
			<div className='balance-of-power r-col r-feature'>
				<h3 className='overline benton-bold'>US Senate balance of power</h3>
				<div className='chart-container'>
					<svg aria-hidden='true' ref={(c) => this._svg = c} />
					<div className='plumbline' />
				</div>
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
