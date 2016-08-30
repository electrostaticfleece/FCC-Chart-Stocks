import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/stockList';
import { ordinalColors } from 'utilityFunctions';

const cx = classNames.bind(styles);

class StockList extends Component {
  constructor(props) {
    super(props);
    this.deleteButton = this.deleteButton.bind(this);
    this.deleteStock = this.deleteStock.bind(this);
    this.state = {
      deleted: null
    }
  }

  deleteStock(e) {
    e.preventDefault();
    e.persist()

    const { deleteStockRequest, stocks: { stocks } } = this.props;
    this.setState({deleted: stocks[e.target.name].ticker});

    setTimeout(() => {
      deleteStockRequest(stocks[e.target.name]);
      this.setState({deleted: null});
    }, 250)
  }

  deleteButton(name) {
    return <input
      type = {'button'}
      value = {'x'}
      onClick = {this.deleteStock}
      name = {name}
      className = {cx('deleteBtn')}
    />
  }

  listStocks() {
    const { stocks , deleteStockRequest } = this.props;
    const shortList = stocks.stockIndex.filter((stock, i) => i < 10);
    return shortList.map((stock) => {
      const name = stocks.stocks[stock].name
      const deleteButton = (deleteStockRequest)  ? this.deleteButton(stock) : null
      const url = name.slice(0, name.indexOf('(')).trim();
      return (
          <div key = {stock}  className={cx('stockListItem')} >
            <li className={cx('stockName')}>
              <a 
                href = {'https://www.google.com/#q=' + url} 
                target={'_blank'} 
                rel={"noopener noreferrer"} 
                className={cx({deleteAnimation: this.state.deleted === stocks.stocks[stock].ticker})}
              >
                {stock}
              </a>
            </li>
            {deleteButton}
          </div>
      )
    })
  }

  render() {
    const { stocks: { stockIndex }} = this.props;
    return (
      <ul className = {cx('stockList')}>
        { this.listStocks() }
      </ul>
    )
  }
}

StockList.propTypes = {
  stocks: PropTypes.object.isRequired,
  deleteStockRequest: PropTypes.func
}

export default StockList