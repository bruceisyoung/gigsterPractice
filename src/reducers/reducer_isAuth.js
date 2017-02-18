export default function(state = false, action) {
	switch(action.type) {
		case 'AUTHSUCCEED': 
		  return true;
		case 'AUTHFAIL': 
			return false;
		case 'LOGOUT': 
			return false;
	}
  return state;
}