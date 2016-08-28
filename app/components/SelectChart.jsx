import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/selectChart';

const cx = classNames.bind(styles);

class SelectChart extends Component {
  constructor(props) {
    super(props);
    this.switchChart = this.switchChart.bind(this);
  }

  switchChart(e) {
    e.preventDefault();
    const { changeGraphType } = this.props;
    const number = e.target.selectedIndex + 1;
    const type = e.target.value;

    changeGraphType({number, name: type});
  }

  getChartTypes(stockIndex, stocks) {
    if(stockIndex.length < 1) {
      return null;
    }

    const chartTypes = stocks[stockIndex[0]].column_names.slice(1);

    return chartTypes.map((chart, i) => {
      return (
        <option key={i + 1} value={chart}>{chart}</option>
      )
    })
  }

  render() {
    const { stocks: { stocks, stockIndex }} = this.props;
    return (
      <div className={cx('selectChart')}>
        <label>Chart </label>
        <select onChange={ this.switchChart } id={'selectChart'} className={cx('select')}>
          {this.getChartTypes(stockIndex, stocks)}
        </select>
      </div>
    )
  }
}

SelectChart.propTypes = {
  stocks: PropTypes.object.isRequired,
  graphNum: PropTypes.number.isRequired,
  changeGraphType: PropTypes.func.isRequired
}

export default SelectChart;