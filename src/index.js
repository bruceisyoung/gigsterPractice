import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './app';
import reducers from './reducers';
import startBoard, { customedMiddleware } from './middleware';

const createStoreWithMiddleware = applyMiddleware(customedMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

startBoard(store);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('app'));