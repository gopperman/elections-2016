// This higher-order component (HOC) contains logic that is used by most
// containers.

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { provideHooks } from 'redial'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './../actions/actionCreators.js'
import {
	reportsAreComplete,
	racesAreComplete,
} from './../utils/completenessUtil.js'

// `WrappedComponent` is the container (e.g. `common/containers/Election.js`.
const connectToApi = (WrappedComponent) => {

	// This object is passed to `provideHooks`, the `redial-redux` decorator
	// that enables client and server-side data fetching.
	const hooks = {

		// `fetch` fires the `fetchResults` redux action with this container's
		// `apiUrl` as the action's `url` parameter.
		fetch: ({ dispatch, params, query }) =>
			dispatch(actions.fetchResults({
				url: WrappedComponent.apiUrl({ params, query }) })),
	}

	// Standard Redux convenience function.
	const mapDispatchToProps = (dispatch) => ({
		dispatch,
		actions: bindActionCreators(actions, dispatch),
	})

	// Note the double decorators! `provideHooks` enables server-side data
	// fetching. `connect` enables react and redux talking to each other.
	return @provideHooks(hooks)
	@connect(s => s, mapDispatchToProps)
	class ConnectToApiHoc extends Component {

		static getSection() {
			return WrappedComponent.getSection()
		}

		static getTitle(params) {
			return WrappedComponent.getTitle(params)
		}

		static getOmnitureTitle(params) {
			return WrappedComponent.getOmnitureTitle(params)
		}

		static propTypes = {
			params: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired,
			timer: PropTypes.object.isRequired,
			results: PropTypes.object.isRequired,
			dispatch: PropTypes.func.isRequired,
		}

		componentDidMount = () => {
			this.fetchData()
		}

		componentDidUpdate = (prevProps) => {

			const { props } = this
			const { startTimer, cancelTimer } = props.actions

			// Did we stop fetching?
			if (prevProps.results.isFetching && !props.results.isFetching) {

				// Get the races and reports,
				const races = _.get(props.results, 'data.races', [])
				const reports = _.get(props.results, 'data.reports', [])

				// and check that they are both complete.
				const complete = racesAreComplete(races) &&
					reportsAreComplete(reports)

				if (complete) {
					cancelTimer()
				} else {
					startTimer()
				}

			}

		}

		fetchData = () => {
			const { dispatch, params } = this.props
			hooks.fetch({ dispatch, params })
		}

		render() {

			const { props, fetchData } = this
			const { timer, results } = props
			const { stopTimer } = props.actions

			// Get all races.
			const races = _.get(results, 'data.races', [])

			// Get all `lastUpdated` race fields.
			const raceDates = _(races)
				.map('reportingUnits')
				.flatten()
				.map('lastUpdated')
				.value()

			// Get all reports.
			const reports = _.get(results, 'data.reports', [])

			// Get all `timestamp` report fields.
			const reportDates = _(reports)
				.map('reports')
				.flatten()
				.map('report.trendtable.timestamp')
				.value()

			// Get the most recent of all timestamps.
			const timestamp = _(raceDates.concat(reportDates))
				.map(v => new Date(v))
				.sortBy()
				.last()

			const timerProps = {
				timestamp,
				...timer,
				callback: () => {
					stopTimer()
					fetchData()
				},
			}

			return (
				<WrappedComponent
					timerProps={timerProps} {...this.props} {...this.state} />
			)

		}

	}

}

export default connectToApi
