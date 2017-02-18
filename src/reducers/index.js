import { combineReducers } from 'redux';
import isAuthReducer from './reducer_isAuth';
import authMessageReducer from './reducer_authMessage';
import showLoginReducer from './reducer_showLogin';

const rootReducer = combineReducers({
	isAuth: isAuthReducer,
	authMessage: authMessageReducer,
	showLogin: showLoginReducer,
});

export default rootReducer;