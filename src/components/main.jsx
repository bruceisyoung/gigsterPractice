import React, { Component} from 'react';
import { connect } from 'react-redux';

import TopBanner from './topBanner';
import CreatePanel from './createPanel';
import ReviseModal from './reviseModal';
import ReportTable from './reportTable';
import ExpenseTable from './expenseTable';
import AddAdminPanel from './addAdminPanel';
import CreateReportPanel from './createReportPanel';
import ErrorMessageBoard from './errorMessageBoard';

class Main extends Component {
  render() {
  	return (
      <div>
        <TopBanner />
        <ReviseModal />
        <div> { this.props.errorMessage.isShown ? <ErrorMessageBoard /> : <div></div> } </div>
        <div> { this.props.createDisplay ? <CreatePanel /> : <div></div> } </div>
        <div> { this.props.addAdminDisplay ? <AddAdminPanel /> : <div></div>} </div>
        <div> { this.props.createReportDisplay ? <CreateReportPanel /> : <div></div> } </div>
        <div> { this.props.expenseDatabase.length !== 0 ? <ExpenseTable /> : <div></div>} </div>
        <div> { this.props.reportData.length !== 0 ? <ReportTable /> : <div></div> } </div>
      </div>
  	);
  }
}

let mapStateToProps = (state) => {
	return {
    addAdminDisplay: state.addAdminDisplay,
		createDisplay: state.createDisplay,
    createReportDisplay: state.createReportDisplay,
    expenseDatabase: state.expenseDatabase,
    errorMessage: state.errorMessage,
    reportData: state.reportData
	};
}

export default connect(mapStateToProps)(Main);