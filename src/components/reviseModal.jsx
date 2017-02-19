import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import Datetime from 'react-datetime';

import { closeModal, updateExpense, deleteExpense, showErrorMessage } from '../actions'; 

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

class ReviseModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datetimePicked: ''
		}
	}

  datetimePicked(datetime) {
    this.setState({datetimePicked: datetime});
  }

	reviseEntry(evt) {
		if (this.props.userInfo.username !== this.props.modal.user) {
			this.props.showErrorMessage('You are not the owner of this expense entry. You can\'t revise it. ' );
		} else {
			var formData = document.getElementById('reviseExpenseForm').elements;

			evt.preventDefault();
			if (this.state.datetimePicked !== '' || this.props.modal.description !== formData.description.value || this.props.modal.amount != formData.amount.value) {
				let datetime = this.state.datetimePicked !== '' ? this.state.datetimePicked : this.props.modal.datetime;
				this.props.updateExpense(datetime, formData.amount.value, formData.description.value, this.props.userInfo.username, this.props.modal.id);
			}
		}
		this.props.closeModal();
	}

	deleteEntry(evt) {
		if (this.props.userInfo.username !== this.props.modal.user) {
			this.props.showErrorMessage('You are not the owner of this expense entry. You can\'t delete it. ');
		} else {
			evt.preventDefault();
			this.props.deleteExpense(this.props.userInfo.username, this.props.modal.id);
		}
		this.props.closeModal();
	}

	render() {
		return (
			<Modal
			  isOpen={ this.props.modal.isOpen }
			  onRequestClose={ this.props.closeModal.bind(this) }
			  style={customStyles}
			  contentLabel="Modal"
			>
				<div className='createContainer'>
					<Datetime className='datetime' defaultValue={ this.props.modal.datetime } onChange={ this.datetimePicked.bind(this) } />
					<form className='expenseForm' id='reviseExpenseForm'>
						<input type='number' step='0.01' min={0} name='amount' defaultValue={ this.props.modal.amount } />
						<input type='text' name='description' defaultValue={ this.props.modal.description } />
						<button onClick={ this.reviseEntry.bind(this) }>Revise</button>
						<button onClick={ this.deleteEntry.bind(this) }>Delete</button>
					</form>
				</div>
			</Modal>
		);
	}
};

let mapStateToProps = (state) => {
  return {
  	userInfo: state.userInfo,
  	modal: state.modal
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  	closeModal: closeModal,
  	updateExpense: updateExpense,
  	deleteExpense: deleteExpense,
  	showErrorMessage: showErrorMessage,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviseModal);