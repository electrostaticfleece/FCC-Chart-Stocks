import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';

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
    />
  }

  listStocks() {
    const { stocks , deleteStockRequest } = this.props;
    return stocks.stockIndex.map((stock) => {
      const deleteButton = (deleteStockRequest)  ? this.deleteButton(stock) : null
      return (
        <div key = {stock} >
          <li>{stock}</li>
          {deleteButton}
        </div>
      )
    })
  }

  render() {
    return (
      <ul>
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