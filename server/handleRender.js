// import { renderToString } from 'react-dom/server'
// import { match, RouterContext } from 'react-router'

export default (req, res) => {

	// match({ routes: routes, location: req.url }, (err, redirect, props) => {

	// 	// in here we can make some decisions all at once
	// 	if (err) {

	// 		// there was an error somewhere during route matching
	// 		res.status(500).send(err.message)


	// 	} else if (redirect) {

	// 		// we haven't talked about `onEnter` hooks on routes, but before a
	// 		// route is entered, it can redirect. Here we handle on the server.
	// 		res.redirect(redirect.pathname + redirect.search)

	// 	} else if (props) {

	// 		// if we got props then we matched a route and can render
	// 		const appHtml = renderToString(<RouterContext {...props}/>)
	// 		res.send(renderPage(appHtml))

	// 	} else {

	// 		// no errors, no redirect, we just didn't match anything
	// 		res.status(404).send('Not Found')

	// 	}
	// })

	// Make express render 'html' view with an object as parameter
	res.render('html', {
		pretty: true,
		appHtml: 'server',
		isProduction: process.env.NODE_ENV === 'production',
	})

}
