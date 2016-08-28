import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateDimensions, changeType, changeView } from 'actions/chart';
import  { typing } from 'actions/user';
import { addStock, deleteStockRequest } from 'actions/stocks';
import ChartDisplay from 'components/ChartDisplay';
import classNames from 'classnames/bind';
import StockInterface from 'components/stockInterface';
import styles from 'css/components/dashboard'

const cx = classNames.bind(styles)

class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { stocks, chart, updateDimensions, changeType, typing, addStock, user: { input }, deleteStockRequest, changeView } = this.props;
    return (
      <div className = {cx('dashboard')}>
        <ChartDisplay 
          stocks = { stocks } 
          chart = { chart }
          updateDimensions = { updateDimensions } 
        />
        <StockInterface 
          stocks = { stocks }
          chart = { chart }
          actions = { {changeType, typing, addStock, changeView} }
          userInput = { input }
          deleteStockRequest = { deleteStockRequest }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    stocks: state.stocks,
    chart: state.chart
  }
}

export default connect(mapStateToProps, { updateDimensions, changeType, typing, addStock, deleteStockRequest, changeView })(Dashboard);