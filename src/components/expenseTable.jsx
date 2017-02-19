import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openModal } from '../actions';

const columns = [{
	header: 'Date & Time',
	accessor: 'datetime',
}, {
	header: 'Description',
	accessor: 'description'
}, {
	header: 'Amount',
	accessor: 'amount'
}, {
	header: 'User',
	accessor: 'user'
}];

class ExpenseTable extends Component {
	rowClicked(state, rowInfo, column, instance) {
		return {
			onClick: evt => {
				this.props.openModal(rowInfo.row.datetime, rowInfo.row.description, rowInfo.row.amount, rowInfo.row.user, rowInfo.row._id);
			}
		}
	}

	render() {
		return (
			<ReactTable
				getTdProps={ this.rowClicked.bind(this) }
				defaultPageSize={10}
				data={ this.props.expenseDatabase }
				columns={ columns } />
		);
	}
};

let mapStateToProps = (state) => {
  return {
    expenseDatabase: state.expenseDatabase
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  	openModal: openModal
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);