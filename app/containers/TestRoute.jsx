import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

//cx = classNames.bind(styles);

class TestRoute extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <h1>Switched</h1>
        <Link to={"/"} >A Link</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TestRoute)