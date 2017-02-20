const defaultState = {
	isOpen: false,
	datetime: undefined,
	description: undefined,
	amount: undefined,
	user: undefined,
	id: undefined
}

export default function(state = defaultState, action) {
	switch(action.type) {
		case 'OPENMODAL': 
		  return {
		  	isOpen: true,
		  	datetime: action.datetime,
		  	description: action.description,
		  	amount: action.amount,
		  	user: action.user,
		  	id: action.id
		  }
		case 'CLOSEMODAL': 
			return defaultState;
		case 'LOGOUT':
			return defaultState;
	}
  return state;
}