import { combineReducers } from 'redux';
import isAuthReducer from './reducer_isAuth';
import authMessageReducer from './reducer_authMessage';
import showLoginReducer from './reducer_showLogin';
import userInfoReducer from './reducer_userInfo';
import createDisplayReducer from './reducer_createDisplay';

const rootReducer = combineReducers({
	isAuth: isAuthReducer,
	authMessage: authMessageReducer,
	showLogin: showLoginReducer,
	userInfo: userInfoReducer,
	createDisplay: createDisplayReducer
});

export default rootReducer;