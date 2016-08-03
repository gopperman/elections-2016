export default function handleRender(req, res) {

	// Make express render 'html' view with an object as parameter
	res.render('html', {
		pretty: true,
		appHtml: 'elections 2016',
	})

}
