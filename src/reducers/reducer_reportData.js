export default function(state = [], action) {
	switch(action.type) {
		case 'UPDATEREPORTDATA': 
			return action.reportData;
		case 'LOGOUT': 
			return [];
	}
	return state;
}