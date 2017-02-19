import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';

import { hideCreateReportPanel, showCreateReportPanel, updateExpenseDatabase, updateReportData } from '../actions';
import { analyzeData } from '../helpers';
class CreateReportPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    }
  }

  handleCancel(evt) {
    this.props.hideCreateReportPanel();
  }

  handleApply(evt, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });

    let filteredDataset = [];
    for(let expense of this.props.expenseDatabase) {
      let datetime = moment(expense.datetime);
      if (datetime >= this.state.startDate && datetime <= this.state.endDate) {
        filteredDataset.push(expense);
      }
    }

    let reportData = analyzeData(filteredDataset, this.state.startDate, this.state.endDate);
    this.props.updateReportData(reportData);
  }

  render() {
    return(
      <div id='dateRangePickerContainer'>
        <DatetimeRangePicker
          maxDate={moment(this.props.expenseDatabase[this.props.expenseDatabase.length - 1].datetime)}
          minDate={moment(this.props.expenseDatabase[0].datetime)}
          startDate={this.state.startDate || moment(this.props.expenseDatabase[0].datetime)}
          endDate={this.state.endDate || moment(this.props.expenseDatabase[this.props.expenseDatabase.length - 1].datetime)}
          onApply={this.handleApply.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <div className="dateRangePickerHandle">
            <div>Click Here to Choose Report Date Range</div>
          </div>
        </DatetimeRangePicker>
      </div>
    );
  }
};

let mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    expenseDatabase: state.expenseDatabase
  };
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hideCreateReportPanel: hideCreateReportPanel,
    showCreateReportPanel: showCreateReportPanel,
    updateExpenseDatabase: updateExpenseDatabase,
    updateReportData: updateReportData
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReportPanel);