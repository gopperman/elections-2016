import urlManager from './urlManager.js'
import { toTitleCase } from './standardize.js'

const nameUtil = {

	election: {

		htmlTitle() {
			return ''
		},
	},

	presidentUS: {

		htmlTitle() {
			return 'President'
		},

		name() {
			return 'US president results'
		},

	},

	presidentMA: {

		htmlTitle() {
			return 'How Mass. voted for president'
		},

		name() {
			return this.htmlTitle()
		},

	},

	office: {

		htmlTitle(params) {
			return toTitleCase(
				[params.statePostal, params.officeName]
					.filter(v => v)
					.map(v => urlManager.decode(v))
					.join(' '))
		},

		name(params) {
			return this.htmlTitle(params)
		},

	},

	race: {

		htmlTitle(params) {

			// e.g. MA State House
			const firstPart = [params.statePostal, params.officeName]
				.filter(v => v)
				.map(v => `${urlManager.decode(v)}`)
				.join(' ')

			// e.g. 10th Bristol
			const secondPart = urlManager.decode(params.seatName)

			// MA State House, 10th Bristol
			return toTitleCase(
				[firstPart, (secondPart || null)]
					.filter(v => v)
					.join(', '))

		},

		name(params) {
			return this.htmlTitle(params)
		},

	},

	town: {

		htmlTitle(params) {

			return toTitleCase(
				[params.location, params.statePostal]
					.filter(v => v)
					.map(v => urlManager.decode(v))
					.join(', '))

		},

		name(params) {
			return this.htmlTitle(params)
		},

	},

}

export default nameUtil
