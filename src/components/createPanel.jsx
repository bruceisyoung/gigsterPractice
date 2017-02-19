import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Datetime from 'react-datetime';

import { hideCreatePanel, saveExpense } from '../actions';

class CreatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datetimePicked: ''
    };
  }

  buttonClicked() {
    this.props.hideCreatePanel();
  }

  datetimePicked(datetime) {
    this.setState({datetimePicked: datetime});
  }

  onFormSubmit(evt) {
    let formData = document.getElementById('expenseForm').elements;

    evt.preventDefault();
    this.props.saveExpense(
      this.props.userInfo.username,
      this.state.datetimePicked === '' ? Date.now() : this.state.datetimePicked._d,
      formData.amount.value,
      formData.description.value);
    this.props.hideCreatePanel();
  }

  render() {
    return (
      <div className='createContainer'>
        <Datetime className='datetime' onChange={ this.datetimePicked.bind(this) }/>
        <form className='expenseForm' id='expenseForm' onSubmit={ this.onFormSubmit.bind(this) }>
          <input name='amount' type='number' step='0.01' min={0} placeholder='enter amount here' />
          <input name='description' type='text' placeholder='describe expense item' />
          <button className='submit-button' type='submit'>Create</button>
          <button onClick={ this.buttonClicked.bind(this) }>Close</button>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hideCreatePanel: hideCreatePanel,
    saveExpense: saveExpense
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePanel);