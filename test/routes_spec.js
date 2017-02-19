var express = require('express');
var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server');

var User = require('../server/db/userdb');
var Expense = require('../server/db/expensedb');

describe('Login & Signup API', () => {
	before((done) => {
		User.remove({username: 'bruce'}).exec();
		User.remove({username: 'reese'}).exec();
		done();
	});

	it('signup create a new user', (done) => {
		request(app)
			.post('/api/signup')
			.send({
				username: 'bruce',
				password: 'Gx1234'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				User.findOne({username: 'bruce'})
					.exec((err, user) => {
						expect(user.username).to.equal('bruce');
						done();
					});
			});
	});
	
	it('signup with an occupied username receive 211 statusCode and a warning message', (done) => {
		request(app)
			.post('/api/signup')
			.send({
				username: 'bruce',
				password: 'Gx1234'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(211);
				expect(res.text).to.equal('This username already exist.');
				done();
			});
	});

	it('login with correct username & password should receive a userInfo object containing useranme and isAdmin indicator', (done) => {
		request(app)
			.post('/api/login')
			.send({
				username: 'bruce',
				password: 'Gx1234'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.have.all.keys('username', 'isAdmin');
				expect(res.body.username).to.equal('bruce');
				done();
			})
	});

	it('login with incorrect password should receive 210 statusCode and a waning message', (done) => {
		request(app)
			.post('/api/login')
			.send({
				username: 'bruce',
				password: 'Gx123'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(210);
				expect(res.text).to.equal('Password doesn\'t match with record.');
				done();
			});
	});

	it('login with a non-existing username should receive 209 statusCode', (done) => {
		request(app)
			.post('/api/login')
			.send({
				username: 'reese',
				password: 'Gx123'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(209);
				expect(res.text).to.equal('This username doesn\'t exist.');
				done();
			});
	});

	it('the password stored insdie database should be encrypted', (done) => {
		request(app)
			.post('/api/signup')
			.send({
				username: 'reese',
				password: 'Gx1234'
			})
			.end((err, res) => {
				expect(res.statusCode).to.equal(200);
				User.findOne({username: 'reese'})
					.exec((err, user) => {
						expect(user.username).to.equal('reese');
						expect(user.password).not.equal('Gx1234');
						done();
					});
			});
	});
});

describe('add admin API', () => {
	const newUser = {
		username: 'bruce',
		password: 'Gx1234',
		isAdmin: false
	};

	const newUser2 = {
		username: 'reese',
		password: 'Gx1234',
		isAdmin: true
	};

	beforeEach((done) => {
		User.remove({username: 'bruce'}).exec();
		User.remove({username: 'reese'}).exec();
		done();
	});

	it('call addadmin api will set a user\'s isAdmin indicator to be true', (done) => {
		(new User(newUser)).save((err, result) => {
			request(app)
				.post('/api/addadmin')
				.send({newAdmin: 'bruce'})
				.end((err, res) => {
					User.find({username: 'bruce'}).exec((err, user) => {
						expect(user.length).to.equal(1);
						expect(user[0].username).to.equal('bruce');
						expect(user[0].isAdmin).to.be.true;
						done(); 
					});
				})
		});
	});

	it('should return 200 statusCode when successfully added a regular user as an admin', (done) => {
		(new User(newUser)).save((err, result) => {
			request(app)
				.post('/api/addadmin')
				.send({newAdmin: 'bruce'})
				.end((err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.text).to.equal('Successfully add bruce as Admin.')
					done();
				})
		});
	});

	it('should return 220 statusCode and warning text when the user trying to add is already an admin', (done) => {
		(new User(newUser2)).save((err, result) => {
			request(app)
				.post('/api/addadmin')
				.send({newAdmin: 'reese'})
				.end((err, res) => {
					expect(res.statusCode).to.equal(220);
					expect(res.text).to.equal('User reese was an Admin.')
					done();
				})
		});
	});

	it('should return 217 statusCode and warning text when the user requested doesn\'t exist', (done) => {
		request(app)
			.post('/api/addadmin')
			.send({newAdmin: 'reese'})
			.end((err, res) => {
				expect(res.statusCode).to.equal(217);
				expect(res.text).to.equal('Can\'t find user( reese ) in the database')
				done();
			})
	});

});

describe('Expense Rated API: create and fetch', () => {
	beforeEach((done) => {
		Expense.remove({user: 'reese'}).exec();
		Expense.remove({user: 'bruce'}).exec();
		done();
	});

	const expenseEntry = {
		datetime: Date.now(),
		cost: 75.00,
		description: 'Z & Y Chinese Food',
		username: 'reese'
	};

	const expenseEntries = [
		{ datetime: Date.now(), user: 'reese', amount: 75.00, description: 'Z & Y Chinese Food' }, 
		{ datetime: Date.now(), user: 'reese', amount: 23.59, description: 'medcine' }, 
		{ datetime: Date.now(), user: 'reese', amount: 21.78, description: 'pet food' }, 
		{ datetime: Date.now(), user: 'reese', amount: 12.00, description: 'Chinese take-out' }, 
		{ datetime: Date.now(), user: 'reese', amount: 73.00, description: 'monthly muni pass' }, 
		{ datetime: Date.now(), user: 'bruce', amount: 16.50, description: 'ice cream' }, 
		{ datetime: Date.now(), user: 'bruce', amount: 99.00, description: 'show ticket' }, 
		{ datetime: Date.now(), user: 'bruce', amount: 12.00, description: 'bart ticket to the airport' }, 
		{ datetime: Date.now(), user: 'bruce', amount: 59.99, description: 'monthly gym pass' }, 
		{ datetime: Date.now(), user: 'bruce', amount: 73.00, description: 'monthly muni pass' }, 
	];

	it('user should be able to save an expense entry through saveexpense api', (done) => {
		Expense.find(({user: 'reese'})).exec((err, expense) => {
			expect(expense.length).to.equal(0);
			request(app)
				.post('/api/saveexpense')
				.send(expenseEntry)
				.end((err, res) => {
					Expense.find({user: 'reese'}).exec((err, expense) => {
						expect(expense.length).to.equal(1);
						expect(expense[0].datetime).to.be.an.instanceof(Date);
						expect(expense[0].amount).to.equal(75.00);
						expect(expense[0].description).to.equal('Z & Y Chinese Food');
						expect(expense[0].user).to.equal('reese');
						done();
					});
				});
		});
	});

	it('should return all the expense entries owned by the logged user', (done) => {
		expenseEntries.forEach((expenseEntry, index) => {
			let newExpense = new Expense(expenseEntry);
			newExpense.save((err, expense) => {
				if (index === 9) {
					request(app)
						.get('/api/expense')
						.query({ username: 'reese' })
						.end((err, res) => {
							expect(res.body.length).to.equal(5);
							done();
						});
				}
			})
		});
	});

	it('should only return the expense entries owned by the logged user', (done) => {
		expenseEntries.forEach((expenseEntry, index) => {
			let newExpense = new Expense(expenseEntry);
			newExpense.save((err, expense) => {
				if (index === 9) {
					request(app)
						.get('/api/expense')
						.query({ username: 'reese' })
						.end((err, res) => {
							res.body.forEach((expense, index) => {
								expect(expense.user).to.equal('reese');
								if (index === 4) {
									done();
								}
							})
						});
				}
			})
		});
	});

	it('should return 200 statusCode and all the expense entries in the database when fetching all expenses', (done) => {
		let entriesCount;
		Expense.find({}).exec((err, entries) => {
			entriesCount = entries.length;
			request(app)
				.get('/api/allexpense')
				.end((err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.length).to.equal(entriesCount);
					done();
				})
		})
	});
});

describe('Expense Rated API: update and delete', () => {
	let expenseID;
	const expenseEntry = {
		datetime: Date.now(),
		amount: 75.00,
		description: 'Z & Y Chinese Food',
		user: 'reese'
	};
	const expenseEntry2 = {
		datetime: Date.now(),
		amount: 12.00,
		description: 'dry clean'
	}

	beforeEach((done) => {
		Expense.remove({user: 'reese'}).exec(() => {
			let newExpense = new Expense(expenseEntry);

			newExpense.save((err, expense) => {
				if (!err) {
					expenseID = expense._id;
					done();
				}
			})
		});
	});

	it('delet: should delete an extry when user provide the expense id', (done) => {
		Expense.find({user: 'reese'}).exec((err, expense) => {
			expect(expense.length).to.equal(1);
			expect(expense[0].user).to.equal('reese');
			request(app)
				.post('/api/deleteexpense')
				.send({username: 'reese', id: expenseID})
				.end((err, res) => {
					Expense.find({user: 'reese'}).exec((err, expense) => {
						expect(expense.length).to.equal(0);
						done();
					})
				});
		})
	});

	it('delete: should return 200 statusCode if correct id is provided', (done) => {
		Expense.find({user: 'reese'}).exec((err, expense) => {
			expect(expense.length).to.equal(1);
			expect(expense[0].user).to.equal('reese');
			request(app)
				.post('/api/deleteexpense')
				.send({username: 'reese', id: expenseID})
				.end((err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.text).to.equal('successfully deleted item');
					done();
				});
		})
	});

	it('delete: should return 509 statusCode and warning text if wrong id is provided', (done) => {
		Expense.find({user: 'reese'}).exec((err, expense) => {
			expect(expense.length).to.equal(1);
			expect(expense[0].user).to.equal('reese');
			request(app)
				.post('/api/deleteexpense')
				.send({username: 'reese', id: expenseID + '1'})
				.end((err, res) => {
					expect(res.statusCode).to.equal(509);
					expect(res.text).to.equal('Internal Database Error');
					done();
				});
		});
	});

	it('modify: should not add a new entry', (done) => {
		Expense.find({user: 'reese'}).exec((err, expense) => {
			expect(expense.length).to.equal(1);
			expect(expense[0].user).to.equal('reese');
			request(app)
				.post('/api/updateexpense')
				.send(Object.assign(expenseEntry2, {id: expenseID}))
				.end((err, res) => {
					Expense.find({user: 'reese'}).exec((err, expense) => {
						expect(expense.length).to.equal(1);
						expect(expense[0].user).to.equal('reese');
						done();
					});
				});
		});
	});

	it('modify: should modify the original entry and has the same id in database', (done) => {
		Expense.find({user: 'reese'}).exec((err, expense) => {
			expect(expense.length).to.equal(1);
			expect(expense[0].user).to.equal('reese');
			request(app)
				.post('/api/updateexpense')
				.send(Object.assign(expenseEntry2, {id: expenseID}))
				.end((err, res) => {
					Expense.find({user: 'reese'}).exec((err, expense) => {
						expect(expense[0]._id).to.deep.equal(expenseID);
						expect(expense[0].amount).to.equal(12.00);
						expect(expense[0].description).to.equal('dry clean');
						done();
					});
				});
		});
	});

	it('modify: should return 200 statusCode if correct id is provided ', (done) => {
		Expense.find({user: 'reese'}).exec((err, expense) => {
			expect(expense.length).to.equal(1);
			expect(expense[0].user).to.equal('reese');
			request(app)
				.post('/api/updateexpense')
				.send(Object.assign(expenseEntry2, {id: expenseID}))
				.end((err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.text).to.equal('successfully updated item');
					done();
				});
		});
	});

	it('modify: should return 509 statusCode and warning text if wrong id is provided', (done) => {
		Expense.find({user: 'reese'}).exec((err, expense) => {
			expect(expense.length).to.equal(1);
			expect(expense[0].user).to.equal('reese');
			request(app)
				.post('/api/updateexpense')
				.send(Object.assign(expenseEntry2, {id: expenseID + 'x'}))
				.end((err, res) => {
					expect(res.statusCode).to.equal(509);
					expect(res.text).to.equal('Internal Database Error');
					done();
				});
		});
	});
});