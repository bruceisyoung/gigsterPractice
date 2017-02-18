export default function(state = true, action ) {
	switch (action.type) {
		case 'SWITCHTOLOGIN': 
			return true;
		case 'SWITCHTOSIGNUP': 
			return false;
		case 'AUTHSUCCEED': 
		  return true;
	}
	return state;
}