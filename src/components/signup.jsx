import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkUsername, checkPassword } from '../helpers';
import { authFail, switchToLogin, signUp } from '../actions';

class Signup extends Component {
  onFormSubmit(evt) {
    var formData = document.getElementById('loginForm').elements;

    evt.preventDefault();
    if (!checkUsername(formData.username.value)) {
    	this.props.authFail('username can only contain letters and numbers');
    } else if (formData.password.value !== formData.repeatedPassword.value) {
    	this.props.authFail('two passwords need to be identical');
    } else if (!checkPassword(formData.password.value)) {
    	this.props.authFail('password needs to be more then 6 chars and contains at least one uppercase letter, one lowercase letter and one number');
    } else {
    	this.props.signUp(formData.username.value, formData.password.value);
    }
  }

  buttonClicked() {
  	this.props.switchToLogin();
  }

  render() {
  	return (
  		<div>
	  		<form className='form-centered' id='loginForm' onSubmit={this.onFormSubmit.bind(this)}>
	  			<input className='usernameInput' maxLength={20} name='username' placeholder='Enter Username Here' type='text' />
	  			<input className='passwordInput' maxLength={20} name='password' placeholder='Enter Password Here' type='password'/>
	  			<input className='passwordInput' maxLength={20} name='repeatedPassword' placeholder='Enter Password again' type='password'/>
	  			<button className='submit-button' type='submit'>Sign Up</button>
	  		</form>
	  		<button className='switchPanel' onClick={this.buttonClicked.bind(this)}> already have an account? </button>
  		</div>
 		);
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    authFail: authFail,
    switchToLogin: switchToLogin,
    signUp: signUp
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(Signup);