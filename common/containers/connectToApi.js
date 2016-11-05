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
		fetch: ({ dispatch, params }) =>
			dispatch(actions.fetchResults({
				url: WrappedComponent.apiUrl(params) })),
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

				if (!complete) {
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
			const { timer } = props
			const { stopTimer } = props.actions

			const timerProps = {
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
