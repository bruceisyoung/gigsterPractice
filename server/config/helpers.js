let bcrypt = require('bcrypt');
let User = require('../db/userdb');

exports.registerAdmin = (username, password) => {
	User.findOne({username: username}).exec((err, user) => {
			if (user) {
				console.log(`Admin account ${user.username} has already been created.`);
			} else {
				bcrypt.hash(password, 10, (err, hash) => {
					let newUser = new User({
						username: username,
						password: hash,
						isAdmin: true
					});
					newUser.save((err, user) => {
						if (err) {
							console.log('Internal Database Error. Please try again later.');
						} else {
							console.log(`Admin account ${user.username} is created.`)
						}
					});
				});
			}
		});
}

exports.sendbackQueryResults = (err, results, res) => {
	if (err) {
		res.status(509).send('Internal Database Error.');
	} else {
		res.status(200).send(results);
	}
}