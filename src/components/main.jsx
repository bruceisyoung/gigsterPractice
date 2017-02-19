import React, { Component} from 'react';
import { connect } from 'react-redux';

import TopBanner from './topBanner';
import CreatePanel from './createPanel';

class Main extends Component {
  render() {
  	return (
      <div>
        <TopBanner />
        <div> { this.props.createDisplay ? <CreatePanel /> : <div></div> } </div>
      </div>
  	);
  }
}

let mapStateToProps = (state) => {
	return {
		createDisplay: state.createDisplay
	};
}

export default connect(mapStateToProps)(Main);