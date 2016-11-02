import docCookies from './docCookies.js'

export default function setPathCookie() {
	// remove previous pathUrl cookie
	docCookies.removeItem('pathUrl', '/', '.bostonglobe.com')

	// get current path to graphic and set pathUrl
	const redirect =
		'/Page/Boston/2011-2020/WebGraphics/National/BostonGlobe.com/2016/11/election/index.html?'
	const path = redirect + window.location.pathname
	docCookies.setItem('pathUrl', path, 'Session', '/', '.bostonglobe.com')
}
