import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkUsername } from '../helpers';
import { addAdmin, hideAddAdminPanel, showAddAdminPanel, showErrorMessage } from '../actions';

class AddAdminPanel extends Component {
	onFormSumbit(evt) {
		var formData = document.getElementById('addAdminForm').elements;
		
		evt.preventDefault();
		if (!checkUsername(formData.newAdmin.value)) {
			this.props.showErrorMessage('username can only contain letters and numbers');
		} else {
			this.props.addAdmin(formData.newAdmin.value);
			this.props.hideAddAdminPanel();
		}
	}

	render() {
		return (
			<div>
				<form className='form-centered' id='addAdminForm' onSubmit={ this.onFormSumbit.bind(this) }>
					<input className='usernameInput' maxLength={20}  name='newAdmin' placeholder='enter new admin here' type='text'/>
					<button className='submit-button' type='submit'>Add Admin</button>
				</form>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    expenseDatabase: state.expenseDatabase
  };
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  	addAdmin: addAdmin,
    hideAddAdminPanel: hideAddAdminPanel,
    showAddAdminPanel: showAddAdminPanel,
    showErrorMessage: showErrorMessage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdminPanel);