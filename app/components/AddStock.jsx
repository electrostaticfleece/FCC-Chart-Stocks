import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/addStock'

const cx = classNames.bind(styles);

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
    const { addStock, typing } = this.props;
    if(e.key === 'Enter') {
      e.preventDefault();
      addStock(e.target.value);
      typing('');
    }
  }

  render() {
    const { userInput } = this.props;
    return (
      <div>
        <label htmlFor={'addStock'} >
          Add Stock
        </label>
        <input 
          type={'text'}
          value={userInput}
          placeholder={'Search by ticker symbol (e.g. FB)'} 
          id = {'addStock'}
          onChange={this.onChange} 
          onKeyPress={this.handleSubmit}
          className={cx('search')}
        />
      </div>
    )
  }
}

AddStock.propTpes = {
  typing: PropTypes.func.isRequired,
  userInput: PropTypes.string,
  addStock: PropTypes.func.isRequired
}

export default AddStock;