import FontFaceObserver from 'fontfaceobserver'
import serializeError from 'serialize-error'

const createStylesheet = () => {
	const style = document.createElement('style')
	document.head.appendChild(style)
	return style.sheet
}

const addFontRule = ({ font, sheet }) => {
	const { weight, family, suffix } = font
	const rule = `
		.${family.toLowerCase()}-${suffix} {
			font-family: '${family}';
			font-weight: ${weight};
		}
	`.trim()
	sheet.insertRule(rule, 0)
}

const handleError = err => {
	console.error('loadFont.js: error trying to load fonts')
	console.error(serializeError(err))
}

const loadFont = fonts => {
	const sheet = createStylesheet()
	const timeout = 8000

	fonts.forEach(font => {
		const { family, weight } = font
		const fontObserver = new FontFaceObserver(family, { weight })
		fontObserver
			.load(null, timeout)
			.then(() => addFontRule({ font, sheet }))
			.catch(handleError)
	})
}

export default loadFont
