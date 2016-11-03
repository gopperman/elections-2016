/* eslint-disable global-require, no-undef */

(function outerClosure() {

	const name = process.env.HP_CONTAINER

	const selector = `window.jQuery && $("#elections-${name}").length`

	globe.onDefine(selector, () => {

		require('es6-promise').polyfill()
		require('./homepageIndex.js')

	})

}())
