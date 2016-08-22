import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { addStock } from 'actions/chart';

//cx = classNames.bind(styles);

class ChartDisplay extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { addStock } = this.props;

    setTimeout(() => {
      addStock('GOOG');
    }, 5000);
    
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div>
        <h1>Up and run!</h1>
        <Link to={"test"} >A Link</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { addStock })(ChartDisplay)