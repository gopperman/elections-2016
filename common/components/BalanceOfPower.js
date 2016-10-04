import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'
import { buildRow, buildSeats } from './../utils/visUtils.js'

class BalanceOfPower extends Component {

/*	static propTypes = {

		// These will never change.
		topoObject: PropTypes.object.isRequired,
		projection: PropTypes.func.isRequired,
		sortingDelegate: PropTypes.func.isRequired,
		unitName: PropTypes.string.isRequired,

		// This will change.
		data: PropTypes.array.isRequired,
	}*/

	render() {

		return (
			<div className='balanceOfPower'>
				<h1>Balance of Power</h1>
			</div>
		)

	}

}

export default BalanceOfPower