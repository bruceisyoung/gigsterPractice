import * as actions from './actions';

export function customedMiddleware(store) {
	return next => action => {
		return next(action);
	};
}

export default function(store) {
}