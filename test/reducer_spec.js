import isAuthReducer from '../src/reducers/reducer_isAuth';
import authMessageReducer from '../src/reducers/reducer_authMessage';
import showLoginReducer from '../src/reducers/reducer_showLogin';
import userInfoReducer from '../src/reducers/reducer_userInfo';
import addAdminDisplayReducer from '../src/reducers/reducer_addAdminDisplay';
import createDisplayReducer from '../src/reducers/reducer_createDisplay';
import expenseDatabaseReducer from '../src/reducers/reducer_expenseDatabase';
import reportDataReducer from '../src/reducers/reducer_reportData';
import modalReducer from '../src/reducers/reducer_modal';
import errorMessageReducer from '../src/reducers/reducer_errorMessage';
import createReportDisplayReducer from '../src/reducers/reducer_createReportDisplay';
import * as actions from '../src/actions';

let expect = require('chai').expect;

const actionsList = ['SIGNUP', 'LOGIN', 'LOGOUT', 'ADDADMIN', 'SWITCHTOLOGIN', 
	'SWITCHTOSIGNUP', 'AUTHSUCCEED', 'AUTHFAIL', 'SHOWADDADMINPANEL', 'HIDEADDADMINPANEL', 
	'SHOWCREATEPANEL', 'HIDECREATEPANEL', 'HIDECREATEREPORTPANEL', 'SHOWCREATEREPORTPANEL', 
	'SAVEEXPENSE', 'DELETEEXPENSE', 'UPDATEEXPENSE', 'FETCHEXPENSE', 'FETCHALLEXPENSE', 
	'UPDATEEXPENSEDATABASE', 'UPDATEREPORTDATA', 'OPENMODAL', 'CLOSEMODAL', 'SHOWERRORMESSAGE', 
	'CHECKOUTDATEDERRORMESSAGE'];

describe('Reducer: ', () => {
	it('isAuth reducer: should return initial state false, indicating user hasn\'t logged in', () => {
		expect(isAuthReducer(undefined, {})).to.be.false;
	});
	it('isAuth reducer: should return true, when user pass authorization test, indicating user logged in', () => {
		expect(isAuthReducer(undefined, {type: 'AUTHSUCCEED'})).to.be.true;
		expect(isAuthReducer(true, {type: 'AUTHSUCCEED'})).to.be.true;
		expect(isAuthReducer(false, {type: 'AUTHSUCCEED'})).to.be.true;
	});
	it('isAuth reducer: should return false, when user doesn\'t pass authorization test', () => {
		expect(isAuthReducer(undefined, {type: 'AUTHFAIL'})).to.be.false;
		expect(isAuthReducer(true, {type: 'AUTHFAIL'})).to.be.false;
		expect(isAuthReducer(true, {type: 'AUTHFAIL'})).to.be.false;
	});
	it('isAuth reducer: should return false, when user logs out', () => {
		expect(isAuthReducer(undefined, {type: 'LOGOUT'})).to.be.false;
		expect(isAuthReducer(true, {type: 'LOGOUT'})).to.be.false;
		expect(isAuthReducer(true, {type: 'LOGOUT'})).to.be.false;
	});
	it('isAuth reducer: state should remains the same if the current action is not AUTHFAIL, AUTHSUCCEED, LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'AUTHSUCCEED' && action !== 'AUTHFAIL' && action !== 'LOGOUT') {
				expect(isAuthReducer(true, {type: action})).to.be.true;
				expect(isAuthReducer(false, {type: action})).to.be.false;
			}
		})
	});


	it('authMessage reducer: should return initial state, empty string', () => {
		expect(authMessageReducer(undefined, {})).to.equal('');
	});
	it('authMessage reducer: should return empty string when authorization succeeds', () => {
		const action = {
			type: 'AUTHSUCCEED',
			username: 'bruce',
			isAdmin: true
		}
		expect(authMessageReducer('', action)).to.equal('');
		expect(authMessageReducer('Password doesn\'t match the record', action)).to.equal('');
	});
	it('authMessage reducer: should return the lastest errorMessage when authorization fails', () => {
		const action = {
			type: 'AUTHFAIL',
			errorMessage: 'Password doesn\'t match the record'
		}
		expect(authMessageReducer(undefined, action)).to.equal('Password doesn\'t match the record');
		expect(authMessageReducer('', action)).to.equal('Password doesn\'t match the record');
		expect(authMessageReducer('Username doesn\'t exist', action)).to.equal('Password doesn\'t match the record');
		expect(authMessageReducer('Password doesn\'t match the record', action)).to.equal('Password doesn\'t match the record');
	});
	it('authMessage reducer: should remain the same if current action is not AUTHSUCCEED or AUTHFAIL', () => {
		actionsList.forEach((action) => {
			if (action !== 'AUTHSUCCEED' && action !== 'AUTHFAIL') {
				expect(authMessageReducer('', {type: action})).to.equal('');
				expect(authMessageReducer('Password doesn\'t match the record', {type: action})).to.equal('Password doesn\'t match the record');
			}
		})
	});


	it('showLogin reducer: should return initial state true, showing the login panel', () => {
		expect(showLoginReducer(undefined, {})).to.be.true;
	});
	it('showLogin reducer: should return true, when user fire \'SWITCHTOLOGIN\' action', () => {
		expect(showLoginReducer(undefined, {type: 'SWITCHTOLOGIN'})).to.be.true;
		expect(showLoginReducer(true, {type: 'SWITCHTOLOGIN'})).to.be.true;
		expect(showLoginReducer(false, {type: 'SWITCHTOLOGIN'})).to.be.true;
	});
	it('showLogin reducer: should return false, when user fire \'SWITCHTOSIGNUP\' action', () => {
		expect(showLoginReducer(undefined, {type: 'SWITCHTOSIGNUP'})).to.be.false;
		expect(showLoginReducer(true, {type: 'SWITCHTOSIGNUP'})).to.be.false;
		expect(showLoginReducer(false, {type: 'SWITCHTOSIGNUP'})).to.be.false;
	});
	it('showLogin reducer: should reset the state to true, when user is successfully authorized', () => {
		const action1 = {
			type: 'AUTHSUCCEED',
			username: 'bruce',
			isAdmin: false
		}
		const action2 = {
			type: 'AUTHSUCCEED',
			username: 'bruce',
			isAdmin: true
		}
		expect(showLoginReducer(undefined, action1)).to.be.true;
		expect(showLoginReducer(true, action1)).to.be.true;
		expect(showLoginReducer(false, action1)).to.be.true;
		expect(showLoginReducer(undefined, action2)).to.be.true;
		expect(showLoginReducer(true, action2)).to.be.true;
		expect(showLoginReducer(false, action2)).to.be.true;
	});
	it('showLogin reducer: should remain the same if current action is not AUTHSUCCEED or SWITCHTOSIGNUP or SWITCHTOLOGIN', () => {
		actionsList.forEach((action) => {
			if (action !== 'AUTHSUCCEED' && action !== 'SWITCHTOLOGIN' && action !== 'SWITCHTOSIGNUP') {
				expect(showLoginReducer(true, {type: action})).to.be.true;
				expect(showLoginReducer(false, {type: action})).to.be.false;
			}
		});
	});


	const userInfoDefaultState = {
		username: '',
		isAdmin: false
	};
	const userInfoAuthedState = {
		username: 'bruce',
		isAdmin: true
	};
	it('uesrInfo reducer: should return initial state, object containing empty string as username and false as isAdmin ', () => {
		expect(userInfoReducer(undefined, {})).to.deep.equal(userInfoDefaultState);
	});
	it('uesrInfo reducer: should return initial state, if user does not pass the authorization test', () => {
		expect(userInfoReducer(undefined, {type: 'AUTHFAIL'})).to.deep.equal(userInfoDefaultState);
		expect(userInfoReducer(userInfoDefaultState, {type: 'AUTHFAIL'})).to.deep.equal(userInfoDefaultState);
		expect(userInfoReducer(userInfoAuthedState, {type: 'AUTHFAIL'})).to.deep.equal(userInfoDefaultState);
	});
	it('uesrInfo reducer: should return initial state, if user logs out', () => {
		expect(userInfoReducer(undefined, {type: 'LOGOUT'})).to.deep.equal(userInfoDefaultState);
		expect(userInfoReducer(userInfoDefaultState, {type: 'LOGOUT'})).to.deep.equal(userInfoDefaultState);
		expect(userInfoReducer(userInfoAuthedState, {type: 'LOGOUT'})).to.deep.equal(userInfoDefaultState);
	});
	it('uesrInfo reducer: should return initial state, if user logs out', () => {
		const action = {
			type: 'AUTHSUCCEED',
			username: 'bruce',
			isAdmin: true
		}
		expect(userInfoReducer(undefined, action)).to.deep.equal(userInfoAuthedState);
		expect(userInfoReducer(userInfoDefaultState, action)).to.deep.equal(userInfoAuthedState);
		expect(userInfoReducer(userInfoAuthedState, action)).to.deep.equal(userInfoAuthedState);
	});
	it('uesrInfo reducer: should remain the same if current action is not AUTHSUCCEED, AUTHFAIL or LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'AUTHSUCCEED' && action !== 'AUTHFAIL' && action !== 'LOGOUT') {
				expect(userInfoReducer(userInfoAuthedState, {type: action})).to.deep.equal(userInfoAuthedState);
				expect(userInfoReducer(userInfoDefaultState, {type: action})).to.deep.equal(userInfoDefaultState);
			}
		})
	});


	it('addAdminDisplay reducer: should return initial state false, meaning the add admin panel is not displayed', () => {
		expect(addAdminDisplayReducer(undefined, {})).to.be.false;
	});
	it('addAdminDisplay reducer: should return true, if current action is SHOWADDADMINPANEL', () => {
		expect(addAdminDisplayReducer(undefined, {type: 'SHOWADDADMINPANEL'})).to.be.true;
		expect(addAdminDisplayReducer(true, {type: 'SHOWADDADMINPANEL'})).to.be.true;
		expect(addAdminDisplayReducer(false, {type: 'SHOWADDADMINPANEL'})).to.be.true;
	});
	it('addAdminDisplay reducer: should return false, if current action is HIDEADMINPANEL', () => {
		expect(addAdminDisplayReducer(undefined, {type: 'HIDEADDADMINPANEL'})).to.be.false;
		expect(addAdminDisplayReducer(true, {type: 'HIDEADDADMINPANEL'})).to.be.false;
		expect(addAdminDisplayReducer(false, {type: 'HIDEADDADMINPANEL'})).to.be.false;
	});
	it('addAdminDisplay reducer: should return false, if user logs out', () => {
		expect(addAdminDisplayReducer(undefined, {type: 'LOGOUT'})).to.be.false;
		expect(addAdminDisplayReducer(true, {type: 'LOGOUT'})).to.be.false;
		expect(addAdminDisplayReducer(false, {type: 'LOGOUT'})).to.be.false;
	});
	it('addAdminDisplay reducer: should remains the same if current action is not SHOWADDADMINPANEL, HIDEADDADMINPANEL or LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'SHOWADDADMINPANEL' && action !== 'HIDEADDADMINPANEL' && action !== 'LOGOUT') {
				expect(addAdminDisplayReducer(true, {type: action})).to.be.true;
				expect(addAdminDisplayReducer(false, {type: action})).to.be.false;
			}
		})
	});

	
	it('createDisplay reducer: should return initial state false, meaning the create expense panel is not displayed', () => {
		expect(createDisplayReducer(undefined, {})).to.be.false;
	});
	it('createDisplay reducer: should return true, if current action is SHOWCREATEPANEL', () => {
		expect(createDisplayReducer(undefined, {type: 'SHOWCREATEPANEL'})).to.be.true;
		expect(createDisplayReducer(true, {type: 'SHOWCREATEPANEL'})).to.be.true;
		expect(createDisplayReducer(false, {type: 'SHOWCREATEPANEL'})).to.be.true;
	});
	it('createDisplay reducer: should return true, if current action is HIDECREATEPANEL', () => {
		expect(createDisplayReducer(undefined, {type: 'HIDECREATEPANEL'})).to.be.false;
		expect(createDisplayReducer(true, {type: 'HIDECREATEPANEL'})).to.be.false;
		expect(createDisplayReducer(false, {type: 'HIDECREATEPANEL'})).to.be.false;
	});
	it('createDisplay reducer: should return true, if current action is LOGOUT', () => {
		expect(createDisplayReducer(undefined, {type: 'LOGOUT'})).to.be.false;
		expect(createDisplayReducer(true, {type: 'LOGOUT'})).to.be.false;
		expect(createDisplayReducer(false, {type: 'LOGOUT'})).to.be.false;
	});
	it('createDisplay reducer: should remains the same if current action is not SHOWCREATEPANEL, HIDECREATEPANEL or LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'SHOWCREATEPANEL' && action !== 'HIDECREATEPANEL' && action !== 'LOGOUT') {
				expect(createDisplayReducer(true, {type: action})).to.be.true;
				expect(createDisplayReducer(false, {type: action})).to.be.false;
			}
		})
	});

	it('createReportDisplay reducer: should return initial state false, meaning the create report panel is not displayed', () => {
		expect(createReportDisplayReducer(undefined, {})).to.be.false;
	});
	it('createReportDisplay reducer: should return true, if current action is SHOWCREATEREPORTPANEL', () => {
		expect(createReportDisplayReducer(undefined, {type: 'SHOWCREATEREPORTPANEL'})).to.be.true;
		expect(createReportDisplayReducer(true, {type: 'SHOWCREATEREPORTPANEL'})).to.be.true;
		expect(createReportDisplayReducer(false, {type: 'SHOWCREATEREPORTPANEL'})).to.be.true;
	});
	it('createReportDisplay reducer: should return true, if current action is HIDECREATEREPORTPANEL', () => {
		expect(createReportDisplayReducer(undefined, {type: 'HIDECREATEREPORTPANEL'})).to.be.false;
		expect(createReportDisplayReducer(true, {type: 'HIDECREATEREPORTPANEL'})).to.be.false;
		expect(createReportDisplayReducer(false, {type: 'HIDECREATEREPORTPANEL'})).to.be.false;
	});
	it('createReportDisplay reducer: should return true, if current action is LOGOUT', () => {
		expect(createReportDisplayReducer(undefined, {type: 'LOGOUT'})).to.be.false;
		expect(createReportDisplayReducer(true, {type: 'LOGOUT'})).to.be.false;
		expect(createReportDisplayReducer(false, {type: 'LOGOUT'})).to.be.false;
	});
	it('createReportDisplay reducer: should remains the same if current action is not SHOWCREATEREPORTPANEL, HIDECREATEREPORTPANEL or LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'SHOWCREATEREPORTPANEL' && action !== 'HIDECREATEREPORTPANEL' && action !== 'LOGOUT') {
				expect(createReportDisplayReducer(true, {type: action})).to.be.true;
				expect(createReportDisplayReducer(false, {type: action})).to.be.false;
			}
		})
	});

	const expenses1 = [{
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
	}]; 
	const expenses2 = [{
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
	}];
	it('expenseDatabase reducer: should return initial state [], meaning empty local expense pool', () => {
		expect(expenseDatabaseReducer(undefined, {})).to.deep.equal([]);
	});
	it('expenseDatabase reducer: should stored expenses, newly passed in, as lastest state', () => {
		expect(expenseDatabaseReducer(undefined, {type: 'UPDATEEXPENSEDATABASE', expenses: expenses1})).to.deep.equal(expenses1);
		expect(expenseDatabaseReducer([], {type: 'UPDATEEXPENSEDATABASE', expenses: expenses1})).to.deep.equal(expenses1);
		expect(expenseDatabaseReducer(expenses1, {type: 'UPDATEEXPENSEDATABASE', expenses: expenses1})).to.deep.equal(expenses1);
		expect(expenseDatabaseReducer(expenses2, {type: 'UPDATEEXPENSEDATABASE', expenses: expenses1})).to.deep.equal(expenses1);
	});
	it('expenseDatabase reducer: should empty local expenses pool when user logs out', () => {
		expect(expenseDatabaseReducer(undefined, {type: 'LOGOUT'})).to.deep.equal([]);
		expect(expenseDatabaseReducer([], {type: 'LOGOUT'})).to.deep.equal([]);
		expect(expenseDatabaseReducer(expenses1, {type: 'LOGOUT'})).to.deep.equal([]);
		expect(expenseDatabaseReducer(expenses2, {type: 'LOGOUT'})).to.deep.equal([]);
	});
	it('expenseDatabase reducer: should remains the same if current action is not UPDATEEXPENSEDATABASE or LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'UPDATEEXPENSEDATABASE' && action !== 'LOGOUT') {
				expect(expenseDatabaseReducer([], {type: action})).to.deep.equal([]);
				expect(expenseDatabaseReducer(expenses1, {type: action})).to.deep.equal(expenses1);
				expect(expenseDatabaseReducer(expenses2, {type: action})).to.deep.equal(expenses2);
			}
		})
	});


	const reportData1 = [{
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
	const reportData2 = [{
		dataRange: '02/06/2017 - 02/12/2017',
		totalAmount: 35
	}, {
		dataRange: '02/13/2017 - 02/19/2017',
		totalAmount: 79.55
	}];
	it('reportData reducer: should return initial state [], meaning no reportData', () => {
		expect(reportDataReducer(undefined, {})).to.deep.equal([]);
	});
	it('reportData reducer: should stored report data, newly passed in, as lastest state', () => {
		expect(reportDataReducer(undefined, {type: 'UPDATEREPORTDATA', reportData: reportData1})).to.deep.equal(reportData1);
		expect(reportDataReducer([], {type: 'UPDATEREPORTDATA', reportData: reportData1})).to.deep.equal(reportData1);
		expect(reportDataReducer(reportData1, {type: 'UPDATEREPORTDATA', reportData: reportData1})).to.deep.equal(reportData1);
		expect(reportDataReducer(reportData2, {type: 'UPDATEREPORTDATA', reportData: reportData1})).to.deep.equal(reportData1);
	});
	it('reportData reducer: should empty report data when user logs out', () => {
		expect(reportDataReducer(undefined, {type: 'LOGOUT'})).to.deep.equal([]);
		expect(reportDataReducer([], {type: 'LOGOUT'})).to.deep.equal([]);
		expect(reportDataReducer(reportData1, {type: 'LOGOUT'})).to.deep.equal([]);
		expect(reportDataReducer(reportData2, {type: 'LOGOUT'})).to.deep.equal([]);

	});
	it('reportData reducer: should remains the same if current action is not UPDATEREPORTDATA or LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'UPDATEREPORTDATA' && action !== 'LOGOUT') {
				expect(reportDataReducer([], {type: action})).to.deep.equal([]);
				expect(reportDataReducer(reportData1, {type: action})).to.deep.equal(reportData1);
				expect(reportDataReducer(reportData2, {type: action})).to.deep.equal(reportData2);
			}
		})
	});

	const modalDefaultState = {
		isOpen: false,
		datetime: undefined,
		description: undefined,
		amount: undefined,
		user: undefined,
		id: undefined
	}
	const modalValidState = {
		isOpen: true,
		datetime: '2017-02-18T08:00:00.000Z',
		description: 'Z & Y Chinese Food',
		amount: 75,
		user: 'bruce',
		id: '58a929233b88a14af16e9dd8'
	}

	it('modal reducer: should return modal defaultState', () => {
		expect(modalReducer(undefined, {})).to.deep.equal(modalDefaultState);
	});
	it('modal reducer: should set the parameters of modal state to values passed in', () => {
		const action = {
			type: 'OPENMODAL',
			datetime: '2017-02-18T08:00:00.000Z',
			description: 'Z & Y Chinese Food',
			amount: 75,
			user: 'bruce',
			id: '58a929233b88a14af16e9dd8'
		}
		expect(modalReducer(undefined, action)).to.deep.equal(modalValidState);
		expect(modalReducer(modalDefaultState, action)).to.deep.equal(modalValidState);
		expect(modalReducer(modalValidState, action)).to.deep.equal(modalValidState);
	});
	it('modal reducer: should return default state when modal is closed ', () => {
		expect(modalReducer(undefined, {type: 'CLOSEMODAL'})).to.deep.equal(modalDefaultState);
		expect(modalReducer(modalDefaultState, {type: 'CLOSEMODAL'})).to.deep.equal(modalDefaultState);
		expect(modalReducer(modalValidState, {type: 'CLOSEMODAL'})).to.deep.equal(modalDefaultState);
	});
	it('modal reducer: should return default state when user logs out', () => {
		expect(modalReducer(undefined, {type: 'LOGOUT'})).to.deep.equal(modalDefaultState);
		expect(modalReducer(modalDefaultState, {type: 'LOGOUT'})).to.deep.equal(modalDefaultState);
		expect(modalReducer(modalValidState, {type: 'LOGOUT'})).to.deep.equal(modalDefaultState);
	});
	it('modal reducer: should remains the same if current action is not OPENMODAL, CLOSEMODAL or LOGOUT', () => {
		actionsList.forEach((action) => {
			if (action !== 'OPENMODAL' && action !== 'CLOSEMODAL' && action !== 'LOGOUT') {
				expect(modalReducer(modalDefaultState, {type: action})).to.deep.equal(modalDefaultState);
				expect(modalReducer(modalValidState, {type: action})).to.deep.equal(modalValidState);
			}
		})
	});
});
