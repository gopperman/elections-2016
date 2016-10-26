import { select } from 'd3-selection'

// Extract svg's `viewBox` width and height.
const getViewBoxDimensions = (svg) => {
	const [,, width, height] = select(svg).attr('viewBox').split(' ')
	return { width, height }
}

export {
	// eslint-disable-next-line import/prefer-default-export
	getViewBoxDimensions,
}
