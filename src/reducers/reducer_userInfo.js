const defaultState = {
	username: '',
	isAdmin: false
};

export default function(state = defaultState, action) {
	switch(action.type) {
		case 'AUTHSUCCEED': 
			return {
				username: action.username,
				isAdmin: action.isAdmin
			};
		case 'AUTHFAIL':
			return defaultState;
		case 'LOGOUT': 
			return defaultState;
	}
  return state;
}