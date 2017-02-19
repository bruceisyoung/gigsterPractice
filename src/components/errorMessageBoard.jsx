import React, { Component} from 'react';
import { connect } from 'react-redux';

class ErrorMessageBoard extends Component {
  render() {
  	return (
      <div>
        <p>{ this.props.errorMessage.text }</p>
      </div>
  	);
  }
}

let mapStateToProps = (state) => {
	return {
		errorMessage: state.errorMessage,
	};
}

export default connect(mapStateToProps)(ErrorMessageBoard);