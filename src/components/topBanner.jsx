import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout, showCreatePanel, hideCreatePanel, fetchExpense, fetchAllExpense, showErrorMessage } from '../actions';

class TopBanner extends Component {
  toggleCreatePanel() {
    if (this.props.createDisplay) {
      this.props.hideCreatePanel();
    } else {
      this.props.showCreatePanel();
    }
  }

  fetchExpense() {
    this.props.fetchExpense(this.props.userInfo.username);
  }

  fetchAllExpense() {
    if (!this.props.userInfo.isAdmin) {
      this.props.showErrorMessage('You are not authorized to view other users\' expense records. ')
    } else {
      this.props.fetchAllExpense();
    }
  }

  render() {
    return (
			<div className='banner'>
        <button className='topRight' onClick= { this.props.logout.bind(this) }>Log Out</button>
        <button className='topRight textButton'>{ this.props.userInfo.isAdmin ? 'Admin' : 'Regular User' }</button>
        <button className='topRight textButton'>{ this.props.userInfo.username }</button>
        <button className='topLeft' onClick={ this.toggleCreatePanel.bind(this) }>{ this.props.createDisplay ? 'Hide' : 'Creat Expense' }</button>
        <button className='topLeft' onClick={ this.fetchExpense.bind(this) }>Show Expense</button>
        <button className='topLeft' onClick={ this.fetchAllExpense.bind(this) }>Show All</button>
			</div>
		);
  }
}

let mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    createDisplay: state.createDisplay
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showCreatePanel: showCreatePanel,
    hideCreatePanel: hideCreatePanel,
    fetchExpense: fetchExpense,
    fetchAllExpense: fetchAllExpense,
    showErrorMessage: showErrorMessage,
    logout: logout
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBanner);