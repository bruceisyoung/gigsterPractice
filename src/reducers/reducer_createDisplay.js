export default function(state = false, action ) {
	switch(action.type) {
		case 'SHOWCREATEPANEL':
			return true;
		case 'HIDECREATEPANEL': 
			return false;
		case 'LOGOUT': 
			return false;
	}
	return state;
}