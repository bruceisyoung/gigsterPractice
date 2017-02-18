export default function(state = '', action ) {
	switch(action.type) {
		case 'AUTHFAIL':
			return action.errorMessage;
		case 'AUTHSUCCEED': 
			return '';
	}
	return state;
}