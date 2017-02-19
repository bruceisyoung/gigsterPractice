import { combineReducers } from 'redux';
import isAuthReducer from './reducer_isAuth';
import authMessageReducer from './reducer_authMessage';
import showLoginReducer from './reducer_showLogin';
import userInfoReducer from './reducer_userInfo';
import createDisplayReducer from './reducer_createDisplay';
import expenseDatabaseReducer from './reducer_expenseDatabase';

const rootReducer = combineReducers({
	isAuth: isAuthReducer,
	authMessage: authMessageReducer,
	showLogin: showLoginReducer,
	userInfo: userInfoReducer,
	createDisplay: createDisplayReducer,
	expenseDatabase: expenseDatabaseReducer,
});

export default rootReducer;