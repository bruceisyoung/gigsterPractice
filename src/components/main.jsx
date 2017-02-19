import React, { Component} from 'react';
import { connect } from 'react-redux';

import TopBanner from './topBanner';
import CreatePanel from './createPanel';
import ReviseModal from './reviseModal';
import ExpenseTable from './expenseTable';
import ErrorMessageBoard from './errorMessageBoard';

class Main extends Component {
  render() {
  	return (
      <div>
        <TopBanner />
        <ReviseModal />
        <div> { this.props.errorMessage.isShown ? <ErrorMessageBoard /> : <div></div> } </div>
        <div> { this.props.createDisplay ? <CreatePanel /> : <div></div> } </div>
        <div> { this.props.expenseDatabase.length !== 0 ? <ExpenseTable /> : <div></div>} </div>
      </div>
  	);
  }
}

let mapStateToProps = (state) => {
	return {
		createDisplay: state.createDisplay,
    expenseDatabase: state.expenseDatabase,
    errorMessage: state.errorMessage,
	};
}

export default connect(mapStateToProps)(Main);