import { combineReducers } from 'redux';
import isAuthReducer from './reducer_isAuth';
import authMessageReducer from './reducer_authMessage';
import showLoginReducer from './reducer_showLogin';
import userInfoReducer from './reducer_userInfo';
import addAdminDisplayReducer from './reducer_addAdminDisplay';
import createDisplayReducer from './reducer_createDisplay';
import expenseDatabaseReducer from './reducer_expenseDatabase';
import reportDataReducer from './reducer_reportData';
import modalReducer from './reducer_modal';
import errorMessageReducer from './reducer_errorMessage';
import createReportDisplayReducer from './reducer_createReportDisplay';

const rootReducer = combineReducers({
	isAuth: isAuthReducer,
	authMessage: authMessageReducer,
	showLogin: showLoginReducer,
	userInfo: userInfoReducer,
	addAdminDisplay: addAdminDisplayReducer,
	createDisplay: createDisplayReducer,
	createReportDisplay: createReportDisplayReducer,
	expenseDatabase: expenseDatabaseReducer,
	reportData: reportDataReducer,
	modal: modalReducer,
	errorMessage: errorMessageReducer
});

export default rootReducer;