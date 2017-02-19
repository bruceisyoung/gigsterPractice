import React, { Component} from 'react';
import { connect } from 'react-redux';

import TopBanner from './topBanner';
import CreatePanel from './createPanel';
import ExpenseTable from './expenseTable';

class Main extends Component {
  render() {
  	return (
      <div>
        <TopBanner />
        <div> { this.props.createDisplay ? <CreatePanel /> : <div></div> } </div>
        <div> { this.props.expenseDatabase.length !== 0 ? <ExpenseTable /> : <div></div>} </div>
      </div>
  	);
  }
}

let mapStateToProps = (state) => {
	return {
		createDisplay: state.createDisplay,
    expenseDatabase: state.expenseDatabase
	};
}

export default connect(mapStateToProps)(Main);