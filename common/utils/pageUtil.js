import urlManager from './urlManager.js'

const pageUtil = {

	election: {

		title() {
			return ''
		},
	},

	presidentUS: {

		title() {
			return 'President'
		},

		name() {
			return 'US president results'
		},

	},

	presidentMA: {

		title() {
			return 'How Mass. voted for president'
		},

		name() {
			return this.title()
		},

	},

	office: {

		title(params) {
			return [params.statePostal, params.officeName]
				.filter(v => v)
				.map(v => urlManager.decode(v))
				.join(' ')
		},

		name(params) {
			return this.title(params)
		},

	},

	race: {

		title(params) {

			// e.g. MA State House
			const firstPart = [params.statePostal, params.officeName]
				.filter(v => v)
				.map(v => `${urlManager.decode(v)}`)
				.join(' ')

			// e.g. 10th Bristol
			const secondPart = urlManager.decode(params.seatName)

			// MA State House, 10th Bristol
			return [firstPart, (secondPart || null)]
				.filter(v => v)
				.join(', ')

		},

		name(params) {
			return this.title(params)
		},

	},

	town: {

		title(params) {
			return [params.location, params.statePostal]
				.filter(v => v)
				.map(v => urlManager.decode(v))
				.join(', ')
		},

		name(params) {
			return this.title(params)
		},

	},

}

export default pageUtil
