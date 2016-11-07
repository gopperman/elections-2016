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

const connectToApi = (WrappedComponent) => {

	const hooks = {
		fetch: ({ dispatch, params, query }) =>
			dispatch(actions.fetchResults({
				url: WrappedComponent.apiUrl({ params, query }) })),
	}

	const mapDispatchToProps = (dispatch) => ({
		dispatch,
		actions: bindActionCreators(actions, dispatch),
	})

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
