import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout, showAddAdminPanel, hideAddAdminPanel, showCreatePanel, hideCreatePanel, showCreateReportPanel, hideCreateReportPanel, fetchExpense, fetchAllExpense, showErrorMessage } from '../actions';

class TopBanner extends Component {
  toggleCreatePanel() {
    if (this.props.createDisplay) {
      this.props.hideCreatePanel();
    } else {
      this.props.showCreatePanel();
    }
  }

  render() {
    return (
			<div className='banner'>
        <button className='topRight' onClick= { this.props.logout.bind(this) }>Log Out</button>
        <button className='topRight textButton'>{ this.props.userInfo.isAdmin ? 'Admin' : 'Regular User' }</button>
        <button className='topRight textButton'>{ this.props.userInfo.username }</button>
        <button className='topLeft' onClick={ this.toggleCreatePanel.bind(this) }>{ this.props.createDisplay ? 'Hide' : 'Creat Expense' }</button>
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
    logout: logout
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBanner);