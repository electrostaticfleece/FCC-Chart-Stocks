import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';

class AddStock extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const { typing, userInput } = this.props;
    typing(e.target.value);
  }

  handleSubmit(e) {
    const { addStock } = this.props;
    console.log(e.key);
    if(e.key === 'Enter') {
      addStock(e.target.value);
    }
  }

  render() {
    return (
      <input 
        type={'text'} 
        placeholder={'Search for a Stock to Add'} 
        onChange={this.onChange} 
        onKeyPress={this.handleSubmit}
      />
    )
  }
}

AddStock.propTpes = {
  typing: PropTypes.func.isRequired,
  userInput: PropTypes.string,
  addStock: PropTypes.func.isRequired
}

export default AddStock;