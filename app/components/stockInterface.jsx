import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import SelectChart from 'components/SelectChart';
import AddStock from 'components/AddStock';
import StockList from 'components/StockList';

class StockInterface extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { stocks, chart, actions: {changeType, typing, addStock}, userInput, deleteStockRequest } = this.props;
    return (
      <div>
        <form onSubmit = { this.handleSubmit }>
          <SelectChart 
            stocks = { stocks }
            changeGraphType = { changeType }
            graphNum = { chart.graphNum }
          />
          <AddStock 
            typing = { typing } 
            userInput = { userInput } 
            addStock = { addStock } 
          />
          <input type ={'submit'} hidden />
        </form>
        <StockList 
          stocks = { stocks }
          deleteStockRequest = { deleteStockRequest }
        />
      </div>
    )
  }
}

StockInterface.propTypes = {
  userInput: PropTypes.string,
  stocks: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default StockInterface;