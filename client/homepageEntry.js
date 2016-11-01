/* eslint-disable global-require, no-undef */

(function outerClosure() {

	globe.onDefine('window.jQuery && $("#elections-HpElectoralCollege").length', () => {

		require('es6-promise').polyfill()
		require('./homepageIndex.js')

	})

}())
