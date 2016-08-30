import React, {PropTypes, Component} from 'react';
import stockChart from 'd3/lineChart';
import classNames from 'classnames/bind';
import styles from 'css/components/chart';
import {ordinalColors} from 'utilityFunctions';


const cx = classNames.bind(styles);

class ChartDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      deleted: null
    }
    this.mapColumns = this.mapColumns.bind(this);
    this.findDate = this.findDate.bind(this);
    this.deleteStock = this.deleteStock.bind(this);
  }

  handleResize(e) {
    const { chart: { margin }, updateDimensions } = this.props;
    const el = this.refs.chart;

    updateDimensions({width: el.offsetWidth, height: el.offsetHeight, margin});
  }

  componentDidMount() {
    const { stocks, chart, updateDimensions, selectDate } = this.props;
    const el = this.refs.chart;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    updateDimensions({width, height, margin: chart.margin});
    stockChart.create(el, stocks, chart, {selectDate});
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const {stocks, chart, selectDate} = this.props;
    const el = this.refs.chart;

    stockChart.update(el, stocks, chart, {selectDate});
  }

  findDate(element, index, array) {
    const { selected: {apiDate} } = this.props.chart
    if(element[0] === apiDate) {
      return true;
    }
    return false;
  }

  deleteStock(e, stock) {
    const { deleteStockRequest } = this.props;
    e.preventDefault();
    e.persist();
    this.setState({deleted: stock.ticker});

    setTimeout(() => {
      deleteStockRequest(stock);
      this.setState({deleted: null});
    }, 250);
  }

  mapColumns() {
    const { stocks: {stocks, stockIndex}, chart} = this.props;
    if(stockIndex.length > 0 && chart.selected) {
      return stockIndex.map((ticker, i) => {
        const stockData = stocks[ticker].data.find(this.findDate);
        const shortName = stocks[ticker].name.slice(0, stocks[ticker].name.indexOf('(')).trim();
        return (
          <div key={ ticker } className={cx({card: true, removeAnimation: this.state.deleted === ticker})}>
            <div className={cx('tickerPod')} style = {{'backgroundColor': ordinalColors[i]}}>
              <h3 className={cx('ticker')}>{ticker}</h3>
            </div>
            <p className={cx('stockName')}>{shortName}</p>
            <div className= {cx('points')}>
              <div className = {cx({point: true, mainPoint: true})} >
                {chart.type + ': '}
                <data>
                  { stockData && stockData[chart.graphNum] ? stockData[chart.graphNum] : 'No Data'}
                </data>
              </div>
              <div className = {cx({point: true})} >
                {'Open: '}
                <data>{stockData && typeof stockData[1] == 'number' ? stockData[1] : 'No Data'}
                </data>
              </div>
              <div className = {cx({point: true})} >
                {'High: '}
                <data>
                  { stockData && typeof stockData[2] == 'number' ? stockData[2] : 'No Data'}
                </data>
              </div>
              <div className = {cx({point: true})} >
                {'Low: '}
                <data>
                  { stockData && typeof stockData[3] == 'number' ? stockData[3] : 'No Data'}
                </data>
              </div>
              <div className = {cx({point: true})} >
                {'Close: '}
                <data>
                  { stockData && typeof stockData[4] == 'number' ? stockData[4] : 'No Data'}
                </data>
              </div>
            </div>
            <span className = {cx('deleteStock')} onClick = {(e) => this.deleteStock(e, stocks[ticker])}>X</span>
          </div>
        )
      })
    }
  }

  render() {
    const { chart: {selected}, stocks: {stocks, stockIndex}} = this.props;
    let stockDate;
    if(selected.d3Date) {
      stockDate = selected.d3Date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    } else {
      stockDate = stocks[stockIndex[0]].data[0][0];
    }

    return (
      <div className={cx('displayWrap')}>
        <div className={cx('chartWrap')} ref={'chart'}>
        </div>
        <div className={cx('stockDisplay')} >
          <h2 className={cx('date')}>{stockDate}</h2>
          <div className={cx('stockCards')} >
            {this.mapColumns()}
          </div>
        </div>
      </div>
    )
  }
}

ChartDisplay.propTypes = {
  stocks: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
  updateDimensions: PropTypes.func.isRequired
}

export default ChartDisplay;