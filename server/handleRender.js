export default function handleRender(req, res) {

	res.render('html', {
		pretty: true,
		appHtml: 'elections 2016',
	})

}
