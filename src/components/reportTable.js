import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const columns = [{
	header: 'Date Range',
	accessor: 'dateRange',
}, {
	header: 'Total Amount',
	accessor: 'totalAmount'
}];

class ReportTable extends Component {
	render() {
		return (
			<ReactTable
				defaultPageSize={10}
				data={ this.props.reportData }
				columns={ columns } />
		);
	}
};

let mapStateToProps = (state) => {
  return {
    reportData: state.reportData
  };
};

export default connect(mapStateToProps)(ReportTable);