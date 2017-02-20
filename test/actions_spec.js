import * as actions from '../src/actions';
let expect = require('chai').expect;

describe('actions', () => {
	const loginInfo1 = ['reese', 'Gx1234'];
	const loginInfo2 = ['bruce', 'Gx1234'];

  it('should create an action to sign up a new account', () => {
  	const expectedAction1 = {
			type: 'SIGNUP',
			username: 'reese',
			password: 'Gx1234'
		};
		const expectedAction2 = {
			type: 'SIGNUP',
			username: 'bruce',
			password: 'Gx1234'
		};
		expect(actions.signUp(loginInfo1[0], loginInfo1[1])).to.deep.equal(expectedAction1);
		expect(actions.signUp(loginInfo2[0], loginInfo2[1])).to.deep.equal(expectedAction2);
	});

	 it('should create an action to login with username and password', () => {
  	const expectedAction1 = {
			type: 'LOGIN',
			username: 'reese',
			password: 'Gx1234'
		};
		const expectedAction2 = {
			type: 'LOGIN',
			username: 'bruce',
			password: 'Gx1234'
		};
		expect(actions.login(loginInfo1[0], loginInfo1[1])).to.deep.equal(expectedAction1);
		expect(actions.login(loginInfo2[0], loginInfo2[1])).to.deep.equal(expectedAction2);
	});

	 it('should create an action to logout', () => {
  	const expectedAction = {
			type: 'LOGOUT'
		};
		expect(actions.logout()).to.deep.equal(expectedAction);
	});

	it('should create an action to add a regular user as admin', () => {
  	const newAdmin = 'bruce';
  	const expectedAction = {
			type: 'ADDADMIN',
			newAdmin: 'bruce'
		};
		expect(actions.addAdmin(newAdmin)).to.deep.equal(expectedAction);
	});

	it('should create an action to switch to login panel', () => {
  	const expectedAction = {
			type: 'SWITCHTOLOGIN'
		};
		expect(actions.switchToLogin()).to.deep.equal(expectedAction);
	});

	it('should create an action to switch to signup panel', () => {
  	const expectedAction = {
			type: 'SWITCHTOSIGNUP'
		};
		expect(actions.switchToSignUp()).to.deep.equal(expectedAction);
	});

	it('should create an action to store the userInfo returned from the server ', () => {
		const userInfo1 = ['bruce', true];
		const userInfo2 = ['reese', false];
		const expectedAction1 = {
			type: 'AUTHSUCCEED',
			username: 'bruce',
			isAdmin: true
		};
		const expectedAction2 = {
			type: 'AUTHSUCCEED',
			username: 'reese',
			isAdmin: false
		};
		expect(actions.authSucceed(userInfo1[0], userInfo1[1])).to.deep.equal(expectedAction1);
		expect(actions.authSucceed(userInfo2[0], userInfo2[1])).to.deep.equal(expectedAction2);
	});

	it('should create an action to display error message when authorization fails', () => {
		const errorMessage = 'Password doesn\'t match the record';
  	const expectedAction = {
			type: 'AUTHFAIL',
			errorMessage: 'Password doesn\'t match the record'
		};
		expect(actions.authFail(errorMessage)).to.deep.equal(expectedAction);
	});

	it('should create an action to display add admin operation panel', () => {
  	const expectedAction = {
			type: 'SHOWADDADMINPANEL'
		};
		expect(actions.showAddAdminPanel()).to.deep.equal(expectedAction);
	});

	it('should create an action to hide add admin operation panel', () => {
  	const expectedAction = {
			type: 'HIDEADDADMINPANEL'
		};
		expect(actions.hideAddAdminPanel()).to.deep.equal(expectedAction);
	});

	it('should create an action to display create expense operation panel', () => {
  	const expectedAction = {
			type: 'SHOWCREATEPANEL'
		};
		expect(actions.showCreatePanel()).to.deep.equal(expectedAction);
	});

	it('should create an action to hide create expense operation panel', () => {
  	const expectedAction = {
			type: 'HIDECREATEPANEL'
		};
		expect(actions.hideCreatePanel()).to.deep.equal(expectedAction);
	});

	it('should create an action to display create report operation panel', () => {
  	const expectedAction = {
			type: 'SHOWCREATEREPORTPANEL'
		};
		expect(actions.showCreateReportPanel()).to.deep.equal(expectedAction);
	});

	it('should create an action to hide create report operation panel', () => {
  	const expectedAction = {
			type: 'HIDECREATEREPORTPANEL'
		};
		expect(actions.hideCreateReportPanel()).to.deep.equal(expectedAction);
	});

	it('should create an object to save an expense entry with necessary info', () => {
		const [username1, date1, cost1, description1] = ['bruce', new Date() , 6.75, 'coffee'];
		const [username2, date2, cost2, description2] = ['reese', new Date(), 24.50, 'laundry detergent'];
		const expectedAction1 = {
			type: 'SAVEEXPENSE',
			username: 'bruce',
			datetime: date1,
			cost: 6.75,
			description: 'coffee'
		};
		const expectedAction2 = {
			type: 'SAVEEXPENSE',
			username: 'reese',
			datetime: date2,
			cost: 24.5,
			description: 'laundry detergent'
		}
		expect(actions.saveExpense(username1, date1, cost1, description1)).to.deep.equal(expectedAction1);
		expect(actions.saveExpense(username2, date2, cost2, description2)).to.deep.equal(expectedAction2);
	});

	it('should create an action to update expense entry with needed info', () => {
		const [date1, cost1, description1, username1, id1] = [new Date() , 6.75, 'coffee', 'bruce', '2cdb75f28fccbff6edb46e2cbde560274f3d6604'];
		const [date2, cost2, description2, username2, id2] = [new Date(), 24.50, 'laundry detergent', 'reese', '49ae42e762d5c7b28d317c2011d8a4b19bb56c15'];
		const expectedAction1 = {
			type: 'UPDATEEXPENSE',
			datetime: date1,
			amount: 6.75,
			description: 'coffee', 
			username: 'bruce',
			id: '2cdb75f28fccbff6edb46e2cbde560274f3d6604'
		};
		const expectedAction2 = {
			type: 'UPDATEEXPENSE',
			datetime: date2,
			amount: 24.5,
			description: 'laundry detergent',
			username: 'reese',
			id: '49ae42e762d5c7b28d317c2011d8a4b19bb56c15'
		}
		expect(actions.updateExpense(date1, cost1, description1, username1, id1)).to.deep.equal(expectedAction1);
		expect(actions.updateExpense(date2, cost2, description2, username2, id2)).to.deep.equal(expectedAction2);
	})

	it('should create an action to delete an expense when expense entry is provided', () => {
		const username = 'bruce';
		const id = '2cdb75f28fccbff6edb46e2cbde560274f3d6604';
		const expectedAction = {
			type: 'DELETEEXPENSE',
			username: 'bruce',
			id: '2cdb75f28fccbff6edb46e2cbde560274f3d6604'
		}
		expect(actions.deleteExpense(username, id)).to.deep.equal(expectedAction);
	});

	it('should create an action to fetch all the expenses owned by a user when the username is provided', () => {
		const username = 'bruce';
		const expectedAction = {
			type: 'FETCHEXPENSE',
			username: 'bruce'
		}
		expect(actions.fetchExpense(username)).to.deep.equal(expectedAction);
	});
	
	it('should create an action to fetch all the expense', () => {
		const expectedAction = {
			type: 'FETCHALLEXPENSE'
		}
		expect(actions.fetchAllExpense()).to.deep.equal(expectedAction);
	});

	it('should create an action to store all the expense entries obtained from server in states', () => {
		const expenses = [ {
			_id: '58a6bede6d0437ad740942c6',
			datetime: '2017-02-06T08:00:00.000Z',
			amount: 35,
			description: 'banana republic shirts',
			user: 'bruce',
			__v: 0
		}, {
			_id: '58a695b2fb29a380020b20b3',
			datetime: '2017-02-17T06:18:26.969Z',
			amount: 4.55,
			description: 'rulers',
			user: 'bruce',
			__v: 0
		}, {
			_id: '58a929233b88a14af16e9dd8',
			datetime: '2017-02-18T08:00:00.000Z',
			amount: 12.00,
			description: 'coffee',
			user: 'bruce',
			__v: 0
		}, {
			_id: '58a695321852fa7f7ee822b0',
			datetime: '2017-04-05T07:00:00.000Z',
			amount: 13.38,
			description: 'apple pie',
			user: 'bruce',
			__v: 0
		}]
		const expectedAction = {
			type: 'UPDATEEXPENSEDATABASE',
			expenses: expenses
		}

		expect(actions.updateExpenseDatabase(expenses)).to.deep.equal(expectedAction);
	});

	it('should create an action to store all the data generated from the helpers.reportData  in states', () => {
		const reportData = [{
			dataRange: '02/06/2017 - 02/12/2017',
			totalAmount: 35
		}, {
			dataRange: '02/13/2017 - 02/19/2017',
			totalAmount: 79.55
		}, {
			dataRange: '02/20/2017 - 02/26/2017',
			totalAmount: 120
		}, {
			dataRange: '04/03/2017 - 04/05/2017',
			totalAmount: 13.82
		}];
		const expectedAction = {
			type: 'UPDATEREPORTDATA',
			reportData: reportData
		}

		expect(actions.updateReportData(reportData)).to.deep.equal(expectedAction);
	});
	
	it('should create an action to open modal and store useful info of the expense which is clicked ', () => {
		const [datetime, description, amount, user, id] = 
			[ Date.now(), 'Z & Y Chinese Food', 75, 'bruce', '58a929233b88a14af16e9dd8' ];
		const expectedAction = {
			type: 'OPENMODAL',
			datetime: datetime,
			description: 'Z & Y Chinese Food',
			amount: 75,
			user: 'bruce',
			id: '58a929233b88a14af16e9dd8'
		}
		expect(actions.openModal(datetime, description, amount, user, id)).to.deep.equal(expectedAction);
	});
	
	it('should create an action to close modal', () => {
		const expectedAction = {
			type: 'CLOSEMODAL'
		}
		expect(actions.closeModal()).to.deep.equal(expectedAction);
	});

	it('should create an action to update error message and record the time when error happens', () => {
		const text = 'You are not authorized to view other users\' expense record';
		const expectedAction = {
			type: 'SHOWERRORMESSAGE',
			text: 'You are not authorized to view other users\' expense record',
			time: Date.now()
		}
		setTimeout(() => {
			expect(actions.showErrorMessage(text).type).to.equal('SHOWERRORMESSAGE');
			expect(actions.showErrorMessage(text).text).to.equal('You are not authorized to view other users\' expense record');
		}, 10);
	});
	
	it('should create an action to compare the current time with the timestamp of the error message', () => {
		const expectedAction = {
			type: 'CHECKOUTDATEDERRORMESSAGE',
			time: Date.now()
		}
		expect(actions.checkOutdatedErrorMessage().type).to.equal('CHECKOUTDATEDERRORMESSAGE');
	});
});