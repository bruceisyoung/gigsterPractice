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

	it('login with incorrect password should receive 210 statuscode and a waning message', (done) => {
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
	})
});

describe('Expense Rated API', () => {
	before((done) => {
		Expense.remove({user: 'reese'}).exec();
		done();
	})

	const expenseEntry1 = {
		datetime: Date.now(),
		cost: 75.00,
		description: 'Z & Y Chinese Food',
		username: 'reese'
	};

	it('user should be able to save an expense entry through saveexpense api', (done) => {
		Expense.find(({user: 'reese'})).exec((err, expense) => {
			expect(expense.length).to.equal(0);
			request(app)
				.post('/api/saveexpense')
				.send(expenseEntry1)
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
});