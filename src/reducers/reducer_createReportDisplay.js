export default function(state = false, action ) {
	switch(action.type) {
		case 'SHOWCREATEREPORTPANEL':
			return true;
		case 'HIDECREATEREPORTPANEL': 
			return false;
		case 'LOGOUT': 
			return false;
	}
	return state;
}