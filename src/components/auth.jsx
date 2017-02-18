import React, { Component} from 'react';
import { connect } from 'react-redux';

import Login from './login';
import Signup from './Signup';

class Auth extends Component {
  render() {
    return(
      <div className='center authContainer'>
      	{ this.props.showLogin ? <Login /> : <Signup /> }
      	<p className='errorMessage'>{ this.props.authMessage }</p>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
	return {
		showLogin: state.showLogin,
		authMessage: state.authMessage
	};
}

export default connect(mapStateToProps)(Auth);