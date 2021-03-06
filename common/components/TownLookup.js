/* eslint-disable max-len */

import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import getTownList from './../utils/getTownList.js'
import urlManager from './../utils/urlManager.js'

class TownLookup extends Component {

	static propTypes = {
		domain: PropTypes.string,
	}

	state = {
		value: null,
		mounted: false,
	}

	// I have to do this to get around a `react-select` bug that, despite
	// a PR (https://github.com/JedWatson/react-select/pull/1105), is
	// not working.
	componentDidMount = () => {
		this.setState({ mounted: true })
	}

	onChange = (value) => {

		const { domain } = this.props

		const location = typeof window !== 'undefined' && window.location
		if (location) {
			this.setState({ value })

			if (value) {
				location.href = urlManager(domain).town({
					townName: value.value, source: 'nav' })
			}

		}

	}

	render() {

		const select = this.state.mounted ?
			<Select
				placeholder='Select a Mass. town...'
				value={this.state.value}
				searchable
				id='town-select'
				className='form__select benton-bold'
				onChange={this.onChange}
				options={getTownList().map(v => ({ value: v, label: v }))} /> :
			null

		return (
			<div className='container-select'>
				<label
					htmlFor='town-select'
					className='benton-bold form__label form__label--overline'>Find your Mass. town results</label>
				{select}
			</div>
		)

	}

}

module.exports = TownLookup
