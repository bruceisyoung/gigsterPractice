import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkUsername, checkPassword } from '../helpers';
import { authFail, switchToSignUp, login } from '../actions';

class Login extends Component {
  onFormSubmit(evt) {
    var formData = document.getElementById('loginForm').elements;

    evt.preventDefault();
    if (!checkUsername(formData.username.value)) {
      this.props.authFail('Username can only contain letters and numbers');
    } else if (!checkPassword(formData.password.value)) {
      this.props.authFail('Password needs to be more then 6 chars and contains at least one uppercase letter, one lowercase letter and one number');
    } else {
      this.props.login(formData.username.value, formData.password.value);
    }
  }

  buttonClicked() {
    this.props.switchToSignUp();
  }

  render() {
  	return (
  		<div>
	  		<form className='form-centered' id='loginForm' onSubmit={ this.onFormSubmit.bind(this) }>
	  			<input className='usernameInput' maxLength={20} name='username' placeholder='Enter Username Here' type='text'/>
	  			<input className='passwordInput' maxLength={20} name='password' placeholder='Enter Password Here' type='password'/>
	  			<button className='submit-button' type='submit'>Log In</button>
	  		</form>
        <button className='switchPanel' onClick={ this.buttonClicked.bind(this) }> don't have an account? </button>
  		</div>
  	);
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    authFail: authFail,
    switchToSignUp: switchToSignUp,
    login: login
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(Login);