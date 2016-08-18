export default (req, res) => {

	// Make express render 'html' view with an object as parameter
	res.render('html', {
		pretty: true,
		appHtml: 'server',
		isProduction: process.env.NODE_ENV === 'production',
	})

}
