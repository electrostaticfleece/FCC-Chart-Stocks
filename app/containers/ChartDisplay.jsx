import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import classNames from 'classnames/bind';

//cx = classNames.bind(styles);

class ChartDisplay extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <h1>Up and run!</h1>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ChartDisplay);