import * as actions from './actions';
import axios from 'axios';

export function customedMiddleware(store) {
	return next => action => {
		if(action.type === 'SIGNUP') {
			axios.post('/api/signup', {
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
			axios.post('/api/login', {
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

		if (action.type === 'SAVEEXPENSE') {
			axios.post('/api/saveexpense', {
				username: action.username,
				datetime: action.datetime,
				cost: action.cost,
				description: action.description
			})
				.then(res => {
					if (res.status === 200) {
						store.dispatch(actions.fetchExpense(action.username));
					}
				})
				.catch(error => console.log(error));
		}

		if (action.type === 'FETCHEXPENSE') {
			axios.get('/api/expense', {
				params: {
					username: action.username
				}
			})
				.then(res => {
					let sortedData = res.data.sort((a, b) => {
						return (new Date(a.datetime)) - (new Date(b.datetime)); 
					});
					store.dispatch(actions
						.updateExpenseDatabase(sortedData));
				})
				.catch(error => console.log(error));
		}

		return next(action);
	};
}

export default function(store) {
}