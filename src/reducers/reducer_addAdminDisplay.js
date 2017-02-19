export default function(state = false, action ) {
	switch(action.type) {
		case 'SHOWADDADMINPANEL':
			return true;
		case 'HIDEADDADMINPANEL': 
			return false;
		case 'LOGOUT': 
			return false;
	}
	return state;
}