import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateDimensions, changeType, changeView, selectDate } from 'actions/chart';
import  { typing } from 'actions/user';
import { addStock, deleteStockRequest } from 'actions/stocks';
import Spinner from 'components/Spinner';
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
    const { stocks, chart, updateDimensions, changeType, typing, selectDate, addStock, user: { input }, deleteStockRequest, changeView } = this.props;
    return (
      <div className = {cx('dashboard')}>
        { stocks.stockIndex.length < 1 && !chart.loaded ? 
          <Spinner />  :
          <ChartDisplay 
            stocks = { stocks } 
            chart = { chart }
            updateDimensions = { updateDimensions } 
            selectDate = {selectDate}
          /> 
        }
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

export default connect(mapStateToProps, { updateDimensions, selectDate, changeType, typing, addStock, deleteStockRequest, changeView })(Dashboard);
