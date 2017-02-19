exports.sendbackQueryResults = (err, results, res) => {
	if (err) {
		res.status(509).send('Internal Database Error.');
	} else {
		res.status(200).send(results);
	}
}