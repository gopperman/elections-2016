import React from 'react';
import Select from 'react-select';

const STATES = require('../../data/states');

var TownLookup = React.createClass({
	propTypes: {
		label: React.PropTypes.string,
		searchable: React.PropTypes.bool,
	},

	getDefaultProps () {
		return {
			label: 'Towns:',
			searchable: true,
		};
	},

	getInitialState () {
		return {
			disabled: false,
			searchable: this.props.searchable,
		};
	},

	updateValue (newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
		window.location.href = '/elections/2016/town/' + newValue
	},

	render () {
		var options = STATES['US'];
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select ref="stateSelect" options={options} simpleValue clearable={this.state.clearable} name="selected-state" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />
			</div>
		);
	}
});


module.exports = TownLookup;
