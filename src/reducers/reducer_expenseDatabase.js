export default function(state = [], action ) {
	switch(action.type) {
		case 'UPDATEEXPENSEDATABASE':
			return action.expenses;
		case 'LOGOUT':
			return [];
	}
	return state;
}