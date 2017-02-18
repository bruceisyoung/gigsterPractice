import * as actions from './actions';
import axios from 'axios';

export function customedMiddleware(store) {
	return next => action => {
		if(action.type === 'SIGNUP') {
			axios.post('/signup', {
				username: action.username,
				password: action.password
			})
				.then(res => {
					if (res.status === 200) {
						store.dispatch(actions.authSucceed(res.data.username, res.data.isAdmin));
					} else {
						store.dispatch(actions.authFail(res.data));
					}
				})
				.catch(error => console.log(error));
		}

		if (action.type === 'LOGIN') {
			axios.post('/login', {
				username: action.username,
				password: action.password
			})
				.then(res => {
					if (res.status === 200) {
						store.dispatch(actions.authSucceed(res.data.username, res.data.isAdmin));
					} else {
						store.dispatch(actions.authFail(res.data));
					}
				})
				.catch(error => console.log(error));
		}
		return next(action);
	};
}

export default function(store) {
}