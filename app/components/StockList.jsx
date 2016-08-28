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
  }

  deleteStock(e) {
    e.preventDefault();

    const { deleteStockRequest, stocks: { stocks } } = this.props;

    deleteStockRequest(stocks[e.target.name]);
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
    return stocks.stockIndex.map((stock) => {
      const name = stocks.stocks[stock].name
      const deleteButton = (deleteStockRequest)  ? this.deleteButton(stock) : null
      const url = name.slice(0, name.indexOf('(')).trim();
      return (
          <div  className={cx('stockListItem')} >
            <li className={cx('stockName')}>
              <a key = {stock} href = {'https://www.google.com/#q=' + url} target={'_blank'} rel={"noopener noreferrer"} >
                {stock}
              </a>
            </li>
            {deleteButton}
          </div>
      )
    })
  }

  render() {
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