let buildNewState = (isShown, text, time) => {
	return {
		isShown: isShown,
		time: time,
		text: text
	};
}

export default function(state = buildNewState(false, '', Date.now()), action ) {
	switch(action.type) {
		case 'SHOWERRORMESSAGE':
			return buildNewState(true, action.text, action.time);
		case 'CHECKOUTDATEDERRORMESSAGE': 
			return (action.time - state.time > 2800) ? buildNewState(false, '', action.time) : state;
		case 'LOGOUT': 
			return buildNewState(false, '', Date.now());
	}
	return state;
}