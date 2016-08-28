import React, {PropTypes, Component} from 'react';
import classNames from 'classnames/bind';

class ChangeView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { changeView } = this.props;

    changeView(e.target.value);
  }

  render() {
    return (
      <div>
        <button value = {'year'} onClick={this.onClick} >1 year</button>
        <button value = {'6 months'} onClick={this.onClick} >6 months</button>
        <button value = {'3 months'} onClick={this.onClick} >3 months</button>
        <button value = {'1 month'} onClick={this.onClick} >1 month</button>
        <button value = {'1 week'} onClick={this.onClick} >1 week</button>
      </div>
    )
  }
}

export default ChangeView;