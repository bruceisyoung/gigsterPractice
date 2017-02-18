import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auth from './components/Auth';
import Main from './components/main';

class App extends Component {
  render() {
    return (
    	<div>
				{ this.props.isAuth ? <Main /> : <Auth /> }
    	</div>
    );
  }
}

let mapStateToProps = (state) => {
	return {
		isAuth: state.isAuth
	};
}

export default connect(mapStateToProps)(App);