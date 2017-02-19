import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
	render() {
		return (
			<ReactTable
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

export default connect(mapStateToProps)(ExpenseTable);